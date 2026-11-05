const path = require("path");
const fsp = require("fs").promises;
const cfg = require("../config/storage");
const Image = require("../models/Image");
const NormalCake = require("../models/NormalCake");
const NormalCakeCategory = require("../models/NormalCakeCategory");
const CustomCakeCategory = require("../models/CustomCakeCategory");
const CustomCakeDesign = require("../models/CustomCakeDesign");
const storage = require("./storage");
const { processImage } = require("./imageProcessor");

const { HttpError } = storage;

// Every model field that may reference an image URL.
const REFERENCE_FIELDS = [
  [NormalCake, "image", "Normal cake"],
  [NormalCakeCategory, "bgImage", "Cake category background"],
  [NormalCakeCategory, "featuredCakeImage", "Cake category featured image"],
  [CustomCakeCategory, "image", "Custom category"],
  [CustomCakeDesign, "image", "Custom design"],
];

const urlOf = (relPath) => (relPath ? `${cfg.PUBLIC_PATH}/${relPath.split(path.sep).join("/")}` : null);

/** Public DTO — never exposes absolute filesystem paths. */
function toDto(doc) {
  const d = doc.toObject ? doc.toObject() : doc;
  const url = urlOf(d.relPath);
  const optimized = d.optimizedSize + (d.thumbSize || 0);
  return {
    id: String(d._id),
    title: d.title,
    description: d.description,
    category: d.category,
    folder: d.folder,
    url,
    thumbUrl: d.thumbRelPath ? urlOf(d.thumbRelPath) : url,
    originalName: d.originalName,
    width: d.width,
    height: d.height,
    format: d.format,
    hasAlpha: d.hasAlpha,
    animated: d.animated,
    recompressed: d.recompressed,
    source: d.source,
    originalSize: d.originalSize,
    optimizedSize: d.optimizedSize,
    thumbSize: d.thumbSize || 0,
    storedSize: optimized,
    savedBytes: Math.max(0, d.originalSize - d.optimizedSize),
    savedPercent:
      d.originalSize > 0 ? Number((Math.max(0, 1 - d.optimizedSize / d.originalSize) * 100).toFixed(1)) : 0,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Process a buffer and persist main + thumbnail atomically.
 * Returns the files written (relative paths) so callers can roll back or reuse.
 */
async function persistProcessed(processed, { folder, originalName, reclaimBytes = 0, baseName }) {
  return storage.withStorageLock(async () => {
    const thumbBytes = processed.thumb ? processed.thumb.buffer.length : 0;
    await storage.assertCapacity(processed.main.buffer.length + thumbBytes, reclaimBytes);

    const base = baseName || storage.uniqueName(originalName);
    const relPath = `${folder}/${base}.webp`;
    const thumbRelPath = processed.thumb ? `${folder}/${cfg.THUMBS_DIRNAME}/${base}.webp` : null;

    try {
      await storage.atomicWrite(relPath, processed.main.buffer);
      if (thumbRelPath) await storage.atomicWrite(thumbRelPath, processed.thumb.buffer);
    } catch (err) {
      await storage.removeFile(relPath);
      await storage.removeFile(thumbRelPath);
      throw err;
    }
    storage.invalidateUsage();
    return { relPath, thumbRelPath, thumbSize: thumbBytes };
  });
}

async function createFromUpload(file, { folder, title, description, category } = {}) {
  folder = storage.normalizeFolder(folder);
  await storage.assertCapacity(0); // fail fast before spending CPU on an upload that can't fit

  const processed = await processImage(file.buffer);
  const written = await persistProcessed(processed, { folder, originalName: file.originalname });

  try {
    const doc = await Image.create({
      title: clean(title, 200) || storage.slugify(file.originalname).replace(/-/g, " "),
      description: clean(description, 2000),
      category: clean(category, 120),
      folder,
      relPath: written.relPath,
      thumbRelPath: written.thumbRelPath,
      originalName: clean(file.originalname, 200),
      originalSize: file.size,
      optimizedSize: processed.main.buffer.length,
      thumbSize: written.thumbSize,
      width: processed.main.width,
      height: processed.main.height,
      format: processed.meta.format,
      hasAlpha: processed.meta.hasAlpha,
      animated: processed.meta.animated,
      recompressed: processed.meta.recompressed,
      checksum: processed.meta.checksum,
      source: "upload",
    });
    return toDto(doc);
  } catch (err) {
    // Keep DB and disk consistent: no orphan files if the record could not be saved.
    await storage.removeFile(written.relPath);
    await storage.removeFile(written.thumbRelPath);
    storage.invalidateUsage();
    throw err;
  }
}

async function findReferences(url) {
  const out = [];
  for (const [Model, field, label] of REFERENCE_FIELDS) {
    const n = await Model.countDocuments({ [field]: url });
    if (n) out.push({ model: Model.modelName, field, label, count: n });
  }
  return out;
}

async function rewriteReferences(oldUrl, newUrl) {
  let changed = 0;
  for (const [Model, field] of REFERENCE_FIELDS) {
    const r = await Model.updateMany({ [field]: oldUrl }, { $set: { [field]: newUrl } });
    changed += r.modifiedCount || 0;
  }
  return changed;
}

async function replaceImage(id, file) {
  const doc = await Image.findById(id);
  if (!doc) throw new HttpError(404, "Image not found");

  await storage.assertCapacity(0);
  const processed = await processImage(file.buffer);
  const oldMain = doc.relPath;
  const oldThumb = doc.thumbRelPath;
  const oldUrl = urlOf(oldMain);
  const reclaim = doc.optimizedSize + (doc.thumbSize || 0);

  const written = await persistProcessed(processed, {
    folder: doc.folder,
    originalName: file.originalname,
    reclaimBytes: reclaim,
  });

  try {
    Object.assign(doc, {
      relPath: written.relPath,
      thumbRelPath: written.thumbRelPath,
      originalName: clean(file.originalname, 200),
      originalSize: file.size,
      optimizedSize: processed.main.buffer.length,
      thumbSize: written.thumbSize,
      width: processed.main.width,
      height: processed.main.height,
      hasAlpha: processed.meta.hasAlpha,
      animated: processed.meta.animated,
      recompressed: processed.meta.recompressed,
      checksum: processed.meta.checksum,
    });
    await doc.save();
    await rewriteReferences(oldUrl, urlOf(written.relPath));
  } catch (err) {
    await storage.removeFile(written.relPath);
    await storage.removeFile(written.thumbRelPath);
    storage.invalidateUsage();
    throw err;
  }

  // Old files are only removed AFTER the DB points at the new ones.
  await storage.removeFile(oldMain);
  await storage.removeFile(oldThumb);
  storage.invalidateUsage();
  return toDto(doc);
}

async function updateMeta(id, body) {
  const doc = await Image.findById(id);
  if (!doc) throw new HttpError(404, "Image not found");
  if (body.title !== undefined) doc.title = clean(body.title, 200);
  if (body.description !== undefined) doc.description = clean(body.description, 2000);
  if (body.category !== undefined) doc.category = clean(body.category, 120);
  await doc.save();
  return toDto(doc);
}

async function deleteImage(id, { force = false } = {}) {
  const doc = await Image.findById(id);
  if (!doc) throw new HttpError(404, "Image not found");
  const url = urlOf(doc.relPath);

  const refs = await findReferences(url);
  if (refs.length && !force) {
    throw new HttpError(409, "This image is in use. Confirm to delete it and clear those references.", {
      code: "IMAGE_IN_USE",
      references: refs,
    });
  }
  if (refs.length) await rewriteReferences(url, "");

  await Image.deleteOne({ _id: doc._id });
  await storage.removeFile(doc.relPath);
  await storage.removeFile(doc.thumbRelPath);
  storage.invalidateUsage();
  return { deleted: true, clearedReferences: refs.reduce((s, r) => s + r.count, 0) };
}

async function list({ page = 1, limit = 24, folder, category, q, sort = "newest" } = {}) {
  page = Math.max(1, parseInt(page, 10) || 1);
  limit = Math.min(60, Math.max(1, parseInt(limit, 10) || 24));
  const filter = {};
  if (folder && folder !== "all") filter.folder = storage.normalizeFolder(folder);
  if (category && category !== "all") filter.category = clean(String(category), 120);
  if (q && String(q).trim()) {
    const esc = String(q).trim().slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [{ title: new RegExp(esc, "i") }, { description: new RegExp(esc, "i") }, { category: new RegExp(esc, "i") }];
  }
  const sorts = { newest: { createdAt: -1 }, oldest: { createdAt: 1 }, largest: { optimizedSize: -1 } };
  const [items, total] = await Promise.all([
    Image.find(filter).sort(sorts[sort] || sorts.newest).skip((page - 1) * limit).limit(limit).lean(),
    Image.countDocuments(filter),
  ]);
  return {
    items: items.map(toDto),
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

module.exports = {
  toDto,
  urlOf,
  createFromUpload,
  replaceImage,
  updateMeta,
  deleteImage,
  list,
  findReferences,
  rewriteReferences,
  persistProcessed,
  REFERENCE_FIELDS,
};

