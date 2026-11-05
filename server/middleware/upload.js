const multer = require("multer");
const cfg = require("../config/storage");
const { HttpError } = require("../services/storage");

// Memory storage: the buffer goes straight to Sharp, and only the optimised result
// is written (atomically) to disk, so no unprocessed upload ever lands in uploads/.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: cfg.MAX_UPLOAD_BYTES, files: cfg.MAX_FILES_PER_REQUEST, fields: 10, parts: 30 },
  fileFilter: (req, file, cb) => {
    // First-pass filter only; the real format check is done on file content in the processor.
    if (/^image\//.test(file.mimetype)) return cb(null, true);
    cb(new HttpError(415, "Only image uploads are allowed."));
  },
});

/** Wrap a multer middleware so its errors become clean JSON responses. */
function handleUpload(mw) {
  return (req, res, next) =>
    mw(req, res, (err) => {
      if (!err) return next();
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ error: `File too large. Maximum is ${Math.round(cfg.MAX_UPLOAD_BYTES / 1048576)} MB.` });
      }
      if (err.code === "LIMIT_FILE_COUNT" || err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ error: "Too many files or unexpected field name." });
      }
      return res.status(err.status || 400).json({ error: err.message || "Upload failed" });
    });
}

module.exports = { upload, handleUpload };
