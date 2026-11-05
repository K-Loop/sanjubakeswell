const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const crypto = require("crypto");
const cfg = require("../config/storage");
const Image = require("../models/Image");
const Migration = require("../models/Migration");
const NormalCake = require("../models/NormalCake");
const NormalCakeCategory = require("../models/NormalCakeCategory");
const CustomCakeCategory = require("../models/CustomCakeCategory");
const storage = require("./storage");
const { processImage, inspect, sha256 } = require("./imageProcessor");
const { persistProcessed, urlOf, REFERENCE_FIELDS } = require("./imageService");
const { seedCatalogue } = require("./seeder");
const gallerySeed = require("../data/gallerySeed.json");

// Static (frontend /public) folders the original site used, and where they land in uploads/
const STATIC_FOLDERS = {
  "/cakes images/": "normal-cakes",
  "/custom cakes/": "custom-cakes",
  "/background images/": "backgrounds",
};
const STATIC_REGEX = "^/(cakes images|custom cakes|background images)/";

const sha1 = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 6);
const titleFromFile = (p) =>
  path.basename(p, path.extname(p)).replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

async function isDone(name) {
  return !!(await Migration.exists({ name }));
}
async function markDone(name, details) {
  await Migration.updateOne({ name }, { $setOnInsert: { name, details, completedAt: new Date() } }, { upsert: true });
}

// ── 1. Catalogue (categories / cakes / designs) ─────────────────────────────
async function migrateCatalogue() {
  const name = "catalogue-seed-v1";
  if (await isDone(name)) return { skipped: true };

  const existing =
    (await NormalCake.estimatedDocumentCount()) + (await NormalCakeCategory.estimatedDocumentCount()) +
    (await CustomCakeCategory.estimatedDocumentCount());

  if (existing > 0) {
    // Existing production data: trust it, never touch it, just remember we looked.
    await markDone(name, { mode: "existing-data-left-untouched" });
    return { skipped: true, reason: "existing data" };
  }
  const stats = await seedCatalogue();
  await markDone(name, { mode: "seeded", ...stats.inserted });
  return stats.inserted;
}

// ── 2. Images ───────────────────────────────────────────────────────────────
async function normalizeReferences(report) {
  for (const [Model, field] of REFERENCE_FIELDS) {
    // Absolute dev/VPS URLs -> relative /uploads/... so they survive domain changes
    const docs = await Model.find({ [field]: /^(https?:)?\/\/[^/]+\/uploads\// }).select(field).lean();
    for (const d of docs) {
      const rel = String(d[field]).split("/uploads/")[1].split("?")[0];
      await Model.updateOne({ _id: d._id }, { $set: { [field]: `${cfg.PUBLIC_PATH}/${rel}` } });
      report.normalizedRefs++;
    }
    // Browser blob: URLs are never valid server-side
    const r = await Model.updateMany({ [field]: /^blob:/ }, { $set: { [field]: "" } });
    report.clearedBlobRefs += r.modifiedCount || 0;
  }
}

async function adoptOrphans(report) {
  const known = new Set(await Image.distinct("relPath"));
  const skipDirs = new Set([cfg.TMP_DIRNAME, cfg.THUMBS_DIRNAME]);

  async function walk(dir) {
    let entries = [];
    try { entries = await fsp.readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (!skipDirs.has(e.name)) await walk(full);
        continue;
      }
      if (!e.isFile() || e.name.startsWith(".")) continue;
      const rel = path.relative(cfg.UPLOAD_DIR, full).split(path.sep).join("/");
      if (known.has(rel)) continue;
      try {
        const buf = await fsp.readFile(full);
        const info = await inspect(buf);
        const top = rel.includes("/") ? rel.split("/")[0] : "";
        await Image.create({
          title: titleFromFile(rel),
          folder: cfg.FOLDERS.includes(top) ? top : cfg.DEFAULT_FOLDER,
          relPath: rel,
          originalName: e.name,
          originalSize: buf.length,
          optimizedSize: buf.length,
          width: info.width,
          height: info.height,
          format: info.format,
          hasAlpha: info.hasAlpha,
          animated: info.animated,
          recompressed: false,
          checksum: sha256(buf),
          source: "legacy",
        });
        report.adoptedOrphans++;
      } catch (err) {
        console.warn(`[MIGRATE] skipped non-image file in uploads: ${rel}`);
      }
    }
  }
  await walk(cfg.UPLOAD_DIR);
}

function resolveSource(staticPath) {
  const prefix = Object.keys(STATIC_FOLDERS).find((p) => staticPath.startsWith(p));
  if (!prefix) return null;
  const abs = path.resolve(cfg.SEED_SOURCE_DIR, "." + staticPath);
  // refuse traversal (value may have been typed by an admin)
  if (!abs.startsWith(cfg.SEED_SOURCE_DIR + path.sep)) return null;
  return { abs, folder: STATIC_FOLDERS[prefix] };
}

async function ingestFile({ abs, folder, seedKey, baseKey, title, category }) {
  const buf = await fsp.readFile(abs);
  const processed = await processImage(buf, { keepOriginal: true });
  const base = `${storage.slugify(path.basename(abs))}-${sha1(baseKey)}`;
  const written = await persistProcessed(processed, { folder, originalName: path.basename(abs), baseName: base });
  return Image.create({
    title,
    category,
    folder,
    relPath: written.relPath,
    thumbRelPath: written.thumbRelPath,
    originalName: path.basename(abs),
    originalSize: buf.length,
    optimizedSize: processed.main.buffer.length,
    thumbSize: written.thumbSize,
    width: processed.main.width,
    height: processed.main.height,
    format: "webp",
    hasAlpha: processed.meta.hasAlpha,
    animated: processed.meta.animated,
    recompressed: processed.meta.recompressed,
    checksum: processed.meta.checksum,
    source: "seed",
    seedKey,
  });
}

async function ingestSeedImages(report) {
  // distinct static image paths currently referenced by catalogue records
  const paths = new Set();
  for (const [Model, field] of REFERENCE_FIELDS) {
    (await Model.distinct(field, { [field]: { $regex: STATIC_REGEX } })).forEach((p) => paths.add(p));
  }

  for (const p of paths) {
    const src = resolveSource(p);
    if (!src || !fs.existsSync(src.abs)) {
      report.missing.push(p);
      continue;
    }
    const seedKey = `seed:${p}`;
    let doc = await Image.findOne({ seedKey });
    if (!doc) {
      doc = await ingestFile({
        abs: src.abs, folder: src.folder, seedKey, baseKey: p,
        title: titleFromFile(p),
        category: src.folder === "backgrounds" ? "Backgrounds" : "Catalogue",
      });
      report.ingested++;
    }
    // Point only UNEDITED references (exact old value) at the backend copy.
    const url = urlOf(doc.relPath);
    for (const [Model, field] of REFERENCE_FIELDS) {
      const r = await Model.updateMany({ [field]: p }, { $set: { [field]: url } });
      report.rewrittenRefs += r.modifiedCount || 0;
    }
  }

  // Gallery items previously lived only in a frontend mock store
  for (const g of gallerySeed) {
    const src = resolveSource(g.image);
    const seedKey = `seed-gallery:${g.id}`;
    if (await Image.exists({ seedKey })) continue;
    if (!src || !fs.existsSync(src.abs)) {
      report.missing.push(g.image);
      continue;
    }
    await ingestFile({
      abs: src.abs, folder: "gallery", seedKey, baseKey: seedKey,
      title: g.title, category: g.category,
    });
    report.ingested++;
  }
}

async function migrateImages() {
  const name = "images-v1";
  if (await isDone(name)) return { skipped: true };

  await storage.ensureDirs();
  await storage.cleanupTemp(0);

  const report = {
    normalizedRefs: 0, clearedBlobRefs: 0, adoptedOrphans: 0,
    ingested: 0, rewrittenRefs: 0, missing: [],
  };
  await normalizeReferences(report);
  await adoptOrphans(report);
  await ingestSeedImages(report);
  storage.invalidateUsage();

  if (report.missing.length === 0) {
    await markDone(name, report);
  } else {
    console.warn(
      `[MIGRATE] ${report.missing.length} source image(s) not found under ${cfg.SEED_SOURCE_DIR}; ` +
      `migration will be retried on next start (set SEED_SOURCE_DIR if needed).`
    );
  }
  return report;
}

async function runMigrations() {
  const catalogue = await migrateCatalogue();
  const images = await migrateImages();
  return { catalogue, images };
}

module.exports = { runMigrations, migrateCatalogue, migrateImages };

