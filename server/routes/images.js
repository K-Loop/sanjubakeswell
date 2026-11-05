const express = require("express");
const authMiddleware = require("../middleware/auth");
const { upload, handleUpload } = require("../middleware/upload");
const images = require("../services/imageService");
const storage = require("../services/storage");

const wrap = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    if (err.status && err.status < 500) {
      return res.status(err.status).json({ error: err.message, code: err.code, references: err.references });
    }
    console.error("[IMAGES]", err);
    res.status(500).json({ error: "Image operation failed" });
  });

const isId = (id) => /^[a-f\d]{24}$/i.test(id);
const checkId = (req, res, next) =>
  isId(req.params.id) ? next() : res.status(400).json({ error: "Invalid image id" });

// ── Admin media library (all authenticated) ──────────────────────────────────
const admin = express.Router();
admin.use(authMiddleware);

admin.get("/stats", wrap(async (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json(await storage.getStats({ fresh: req.query.fresh === "1" }));
}));

admin.get("/", wrap(async (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json(await images.list(req.query));
}));

admin.put("/:id", checkId, wrap(async (req, res) => {
  res.json(await images.updateMeta(req.params.id, req.body || {}));
}));

admin.post("/:id/replace", checkId, handleUpload(upload.single("image")), wrap(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file provided" });
  res.json(await images.replaceImage(req.params.id, req.file));
}));

admin.delete("/:id", checkId, wrap(async (req, res) => {
  res.json(await images.deleteImage(req.params.id, { force: req.query.force === "true" }));
}));

// ── Public paginated gallery (thumbnails, cacheable, no sensitive fields) ────
const gallery = express.Router();
gallery.get("/", wrap(async (req, res) => {
  const data = await images.list({
    page: req.query.page,
    limit: Math.min(48, parseInt(req.query.limit, 10) || 24),
    folder: "gallery",
    category: req.query.category,
    sort: "oldest",
  });
  res.set("Cache-Control", "public, max-age=60");
  res.json({
    items: data.items.map((i) => ({
      id: i.id, title: i.title, category: i.category, url: i.url, thumbUrl: i.thumbUrl,
      width: i.width, height: i.height,
    })),
    page: data.page, totalPages: data.totalPages, total: data.total,
  });
}));

module.exports = { admin, gallery };

