const mongoose = require("mongoose");

/**
 * One document per stored image. `relPath` / `thumbRelPath` are paths RELATIVE to
 * the uploads root (e.g. "normal-cakes/choco-1730000000000-ab12cd34.webp"); the public
 * URL is always `/uploads/<relPath>`. Absolute filesystem paths are never stored.
 */
const ImageSchema = new mongoose.Schema(
  {
    title: { type: String, default: "", trim: true, maxlength: 200 },
    description: { type: String, default: "", trim: true, maxlength: 2000 },
    category: { type: String, default: "", trim: true, maxlength: 120 },
    folder: { type: String, required: true, index: true },

    relPath: { type: String, required: true, unique: true },
    thumbRelPath: { type: String, default: null },

    originalName: { type: String, default: "" },
    originalSize: { type: Number, default: 0 }, // bytes as uploaded
    optimizedSize: { type: Number, default: 0 }, // bytes of the stored main file
    thumbSize: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    format: { type: String, default: "webp" },
    hasAlpha: { type: Boolean, default: false },
    animated: { type: Boolean, default: false },
    recompressed: { type: Boolean, default: true }, // false when an optimised WebP was stored as-is

    checksum: { type: String, default: "" }, // sha256 of the stored main file
    source: { type: String, enum: ["upload", "seed", "legacy"], default: "upload" },
    seedKey: { type: String, default: undefined },
  },
  { timestamps: true }
);

ImageSchema.index({ seedKey: 1 }, { unique: true, sparse: true });
ImageSchema.index({ folder: 1, createdAt: -1 });
ImageSchema.index({ category: 1 });

module.exports = mongoose.model("Image", ImageSchema);

