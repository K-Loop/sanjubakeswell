const path = require("path");

const GB = 1024 ** 3;
const MB = 1024 ** 2;

const num = (v, fallback) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

/**
 * Central storage configuration. Everything is overridable via environment
 * variables so nothing is hardcoded for a particular machine.
 *
 *   UPLOAD_DIR            absolute path of the persistent image directory
 *   STORAGE_LIMIT_BYTES   image storage budget (default 7 GB)
 *   MAX_UPLOAD_MB         max size of a single uploaded file before optimisation
 *   SEED_SOURCE_DIR       directory holding the original static images (frontend /public)
 */
module.exports = {
  UPLOAD_DIR: path.resolve(process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads")),
  TMP_DIRNAME: ".tmp",
  THUMBS_DIRNAME: "thumbs",
  PUBLIC_PATH: "/uploads",

  SEED_SOURCE_DIR: path.resolve(
    process.env.SEED_SOURCE_DIR || path.join(__dirname, "..", "..", "public")
  ),

  STORAGE_LIMIT_BYTES: num(process.env.STORAGE_LIMIT_BYTES, 7 * GB),
  WARN_PERCENT: num(process.env.STORAGE_WARN_PERCENT, 80),
  CRITICAL_PERCENT: num(process.env.STORAGE_CRITICAL_PERCENT, 95),

  MAX_UPLOAD_BYTES: num(process.env.MAX_UPLOAD_MB, 20) * MB,
  MAX_FILES_PER_REQUEST: 10,
  MAX_INPUT_PIXELS: 120e6, // decompression-bomb guard

  // Optimisation. 2400px long edge keeps retina-sharp output; nothing is ever enlarged.
  MAX_DIMENSION: num(process.env.IMAGE_MAX_DIMENSION, 2400),
  THUMB_WIDTH: num(process.env.IMAGE_THUMB_WIDTH, 480),
  WEBP_QUALITY: num(process.env.IMAGE_WEBP_QUALITY, 85),
  THUMB_QUALITY: num(process.env.IMAGE_THUMB_QUALITY, 78),
  PROCESS_CONCURRENCY: num(process.env.IMAGE_CONCURRENCY, 2),

  ALLOWED_FORMATS: ["jpeg", "png", "webp", "avif", "gif", "heif"],

  // Allow-listed sub folders (prevents arbitrary directory creation / traversal)
  FOLDERS: ["normal-cakes", "custom-cakes", "categories", "gallery", "backgrounds", "general"],
  DEFAULT_FOLDER: "general",

  GB,
  MB,
};

