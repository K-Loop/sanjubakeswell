const sharp = require("sharp");
const crypto = require("crypto");
const cfg = require("../config/storage");
const { HttpError } = require("./storage");

sharp.cache({ memory: 64, files: 0, items: 50 }); // keep memory predictable on a small VPS

// ── Bounded concurrency so a burst of uploads never starves normal API traffic ─
let active = 0;
const waiters = [];
async function withSlot(fn) {
  if (active >= cfg.PROCESS_CONCURRENCY) await new Promise((r) => waiters.push(r));
  active++;
  try {
    return await fn();
  } finally {
    active--;
    const next = waiters.shift();
    if (next) next();
  }
}

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

/** Detect the real format from file CONTENT (never trust extension / mimetype). */
async function inspect(buffer) {
  let meta;
  try {
    meta = await sharp(buffer, { animated: true, limitInputPixels: cfg.MAX_INPUT_PIXELS }).metadata();
  } catch {
    throw new HttpError(415, "File is not a valid or supported image.");
  }
  if (!meta.format || !cfg.ALLOWED_FORMATS.includes(meta.format)) {
    throw new HttpError(415, `Unsupported image type. Allowed: JPEG, PNG, WebP, AVIF, GIF, HEIC.`);
  }
  const width = meta.width || 0;
  const height = meta.pageHeight || meta.height || 0;
  if (!width || !height) throw new HttpError(415, "Image has no readable dimensions.");
  return {
    format: meta.format,
    width,
    height,
    animated: (meta.pages || 1) > 1,
    hasAlpha: !!meta.hasAlpha,
  };
}

/**
 * Convert an upload into optimised WebP (+ thumbnail when beneficial).
 *  - aspect ratio always preserved (fit: inside, never enlarged, never cropped)
 *  - an already-optimised WebP within size limits is stored as-is (no generation loss)
 *  - alpha preserved; animated GIF/WebP stay animated
 */
function processImage(buffer, { keepOriginal = false } = {}) {
  return withSlot(async () => {
    const info = await inspect(buffer);
    const longEdge = Math.max(info.width, info.height);
    const needsResize = longEdge > cfg.MAX_DIMENSION;

    let main;
    let recompressed = true;

    // keepOriginal (used for the one-time migration of the existing site images) stores
    // WebP files byte-for-byte so migrated photos look exactly like before.
    if (info.format === "webp" && !info.animated && (!needsResize || keepOriginal)) {
      // Already WebP and not oversized: re-encoding would only lose quality.
      main = { buffer, width: info.width, height: info.height };
      recompressed = false;
    } else {
      const encode = (quality) =>
        sharp(buffer, { animated: info.animated, limitInputPixels: cfg.MAX_INPUT_PIXELS })
          .rotate() // honour EXIF orientation, then strip metadata
          .resize({
            width: cfg.MAX_DIMENSION,
            height: cfg.MAX_DIMENSION,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality, effort: info.animated ? 3 : 4, alphaQuality: 100, smartSubsample: true })
          .toBuffer({ resolveWithObject: true });

      let out = await encode(cfg.WEBP_QUALITY);
      // Rare: a very efficient source JPEG/AVIF that WebP can't beat at this quality.
      if (out.data.length >= buffer.length && !needsResize && !info.animated) {
        const retry = await encode(Math.max(70, cfg.WEBP_QUALITY - 8));
        if (retry.data.length < out.data.length) out = retry;
      }
      const h = out.info.pageHeight || out.info.height;
      main = { buffer: out.data, width: out.info.width, height: h };
    }

    // Thumbnail only when it is meaningfully smaller than the main image.
    let thumb = null;
    if (main.width > cfg.THUMB_WIDTH * 1.25) {
      const t = await sharp(main.buffer, { limitInputPixels: cfg.MAX_INPUT_PIXELS }) // first frame only
        .rotate()
        .resize({ width: cfg.THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: cfg.THUMB_QUALITY, effort: 4 })
        .toBuffer();
      if (t.length < main.buffer.length * 0.9) thumb = { buffer: t };
    }

    return {
      main,
      thumb,
      meta: {
        format: "webp",
        sourceFormat: info.format,
        hasAlpha: info.hasAlpha,
        animated: info.animated,
        recompressed,
        checksum: sha256(main.buffer),
      },
    };
  });
}

module.exports = { processImage, inspect, sha256 };
