const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const { upload, handleUpload } = require("../middleware/upload");
const images = require("../services/imageService");

const wrap = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    if (err.status && err.status < 500) {
      return res.status(err.status).json({ error: err.message, code: err.code, references: err.references });
    }
    console.error("[UPLOAD]", err);
    res.status(500).json({ error: "Image processing failed. Please try again." });
  });

// POST /api/upload/image — single image (field "image"); optional folder/title/description/category
router.post(
  "/image",
  authMiddleware,
  handleUpload(upload.single("image")),
  wrap(async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file provided" });
    const dto = await images.createFromUpload(req.file, req.body);
    res.status(201).json(dto);
  })
);

// POST /api/upload/multiple — up to 10 images (field "images"); processed sequentially
router.post(
  "/multiple",
  authMiddleware,
  handleUpload(upload.array("images", 10)),
  wrap(async (req, res) => {
    if (!req.files || !req.files.length) return res.status(400).json({ error: "No files provided" });
    const results = [];
    const errors = [];
    for (const file of req.files) {
      try {
        results.push(await images.createFromUpload(file, req.body));
      } catch (err) {
        errors.push({ file: file.originalname, error: err.status && err.status < 500 ? err.message : "Processing failed" });
        if (err.code === "STORAGE_FULL") break;
      }
    }
    res.status(results.length ? 201 : 400).json({ images: results, errors });
  })
);

module.exports = router;
