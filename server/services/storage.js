const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const crypto = require("crypto");
const cfg = require("../config/storage");
const Image = require("../models/Image");

class HttpError extends Error {
  constructor(status, message, extra = {}) {
    super(message);
    this.status = status;
    Object.assign(this, extra);
  }
}

const TMP_DIR = path.join(cfg.UPLOAD_DIR, cfg.TMP_DIRNAME);

async function ensureDirs() {
  await fsp.mkdir(TMP_DIR, { recursive: true, mode: 0o755 });
  for (const f of cfg.FOLDERS) {
    await fsp.mkdir(path.join(cfg.UPLOAD_DIR, f, cfg.THUMBS_DIRNAME), { recursive: true, mode: 0o755 });
  }
}

/** Resolve a relative upload path, refusing anything that escapes the uploads root. */
function safeResolve(relPath) {
  if (typeof relPath !== "string" || !relPath || relPath.includes("\0")) {
    throw new HttpError(400, "Invalid file path");
  }
  const abs = path.resolve(cfg.UPLOAD_DIR, relPath);
  if (abs !== cfg.UPLOAD_DIR && !abs.startsWith(cfg.UPLOAD_DIR + path.sep)) {
    throw new HttpError(400, "Invalid file path");
  }
  return abs;
}

function normalizeFolder(folder) {
  if (!folder) return cfg.DEFAULT_FOLDER;
  const f = String(folder).trim().toLowerCase();
  if (!cfg.FOLDERS.includes(f)) {
    throw new HttpError(400, `Invalid folder. Allowed: ${cfg.FOLDERS.join(", ")}`);
  }
  return f;
}

function slugify(name) {
  return (
    path
      .basename(String(name || ""), path.extname(String(name || "")))
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase()
      .slice(0, 40) || "image"
  );
}

function uniqueName(originalName) {
  return `${slugify(originalName)}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}

/** Atomic write: temp file inside the same filesystem, then rename into place. */
async function atomicWrite(relPath, buffer) {
  const dest = safeResolve(relPath);
  await fsp.mkdir(path.dirname(dest), { recursive: true, mode: 0o755 });
  await fsp.mkdir(TMP_DIR, { recursive: true, mode: 0o755 });
  const tmp = path.join(TMP_DIR, `${crypto.randomBytes(8).toString("hex")}.part`);
  try {
    await fsp.writeFile(tmp, buffer, { mode: 0o644 });
    await fsp.rename(tmp, dest);
  } catch (err) {
    await fsp.unlink(tmp).catch(() => {});
    throw err;
  }
}

async function removeFile(relPath) {
  if (!relPath) return;
  try {
    await fsp.unlink(safeResolve(relPath));
  } catch (err) {
    if (err.code !== "ENOENT") console.warn("[STORAGE] could not remove", relPath, err.message);
  }
}

// ── Disk usage (the real directory is the source of truth) ───────────────────
let usageCache = null;
let usageCacheAt = 0;
const USAGE_TTL_MS = 10_000;

async function walk(dir, acc) {
  let entries;
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }
  await Promise.all(
    entries.map(async (e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return walk(full, acc);
      if (!e.isFile()) return;
      try {
        const st = await fsp.stat(full);
        acc.bytes += st.size;
        acc.files += 1;
        if (full.startsWith(TMP_DIR + path.sep)) acc.tempBytes += st.size;
      } catch (err) {
        if (err.code !== "ENOENT") throw err; // file vanished mid-scan (rename/delete)
      }
    })
  );
}

async function getDiskUsage({ fresh = false } = {}) {
  if (!fresh && usageCache && Date.now() - usageCacheAt < USAGE_TTL_MS) return usageCache;
  const acc = { bytes: 0, files: 0, tempBytes: 0 };
  await walk(cfg.UPLOAD_DIR, acc);
  usageCache = acc;
  usageCacheAt = Date.now();
  return acc;
}

function invalidateUsage() {
  usageCache = null;
}

function usageState(usedBytes, limitBytes = cfg.STORAGE_LIMIT_BYTES) {
  const pct = limitBytes > 0 ? (usedBytes / limitBytes) * 100 : 100;
  if (pct >= 100) return "full";
  if (pct >= cfg.CRITICAL_PERCENT) return "critical";
  if (pct >= cfg.WARN_PERCENT) return "warning";
  return "ok";
}

async function getStats({ fresh = false } = {}) {
  const disk = await getDiskUsage({ fresh });
  const [agg] = await Image.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        original: { $sum: "$originalSize" },
        optimized: { $sum: { $add: ["$optimizedSize", "$thumbSize"] } },
      },
    },
  ]);
  const limit = cfg.STORAGE_LIMIT_BYTES;
  const used = disk.bytes;
  const remaining = Math.max(0, limit - used);
  const percent = Math.min(100, (used / limit) * 100);
  const original = agg?.original || 0;
  const optimized = agg?.optimized || 0;
  return {
    limitBytes: limit,
    usedBytes: used,
    remainingBytes: remaining,
    percentUsed: Number(((used / limit) * 100).toFixed(2)),
    percentBar: Number(percent.toFixed(2)),
    state: usageState(used, limit),
    warnPercent: cfg.WARN_PERCENT,
    criticalPercent: cfg.CRITICAL_PERCENT,
    fileCount: disk.files,
    tempBytes: disk.tempBytes,
    imageCount: agg?.count || 0,
    originalBytes: original,
    optimizedBytes: optimized,
    savedBytes: Math.max(0, original - optimized),
    savedPercent: original > 0 ? Number((Math.max(0, 1 - optimized / original) * 100).toFixed(1)) : 0,
    maxUploadBytes: cfg.MAX_UPLOAD_BYTES,
    generatedAt: new Date().toISOString(),
  };
}

/** Serialise quota-check + write so concurrent uploads cannot overshoot the budget. */
let lockChain = Promise.resolve();
function withStorageLock(fn) {
  const run = lockChain.then(fn, fn);
  lockChain = run.catch(() => {});
  return run;
}

/** Throws 507 if `incomingBytes` more (minus `reclaimBytes`) would exceed the budget. */
async function assertCapacity(incomingBytes, reclaimBytes = 0) {
  const { bytes } = await getDiskUsage({ fresh: true });
  const projected = bytes - reclaimBytes + incomingBytes;
  if (projected > cfg.STORAGE_LIMIT_BYTES) {
    throw new HttpError(507, "Image storage limit reached. Delete unused images before uploading more.", {
      code: "STORAGE_FULL",
      usedBytes: bytes,
      limitBytes: cfg.STORAGE_LIMIT_BYTES,
    });
  }
}

/** Remove abandoned temp files (crashed uploads). */
async function cleanupTemp(maxAgeMs = 10 * 60 * 1000) {
  let removed = 0;
  try {
    for (const name of await fsp.readdir(TMP_DIR)) {
      const full = path.join(TMP_DIR, name);
      const st = await fsp.stat(full).catch(() => null);
      if (st && st.isFile() && Date.now() - st.mtimeMs > maxAgeMs) {
        await fsp.unlink(full).catch(() => {});
        removed++;
      }
    }
  } catch (err) {
    if (err.code !== "ENOENT") console.warn("[STORAGE] temp cleanup failed:", err.message);
  }
  invalidateUsage();
  return removed;
}

module.exports = {
  HttpError,
  ensureDirs,
  safeResolve,
  normalizeFolder,
  slugify,
  uniqueName,
  atomicWrite,
  removeFile,
  getDiskUsage,
  invalidateUsage,
  usageState,
  getStats,
  withStorageLock,
  assertCapacity,
  cleanupTemp,
  TMP_DIR,
};

