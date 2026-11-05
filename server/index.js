/**
 * Sanjus Bakesvelle — Express API Server
 * Node.js + Express + MongoDB + local persistent image storage (Sharp -> WebP)
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

const cfg = require("./config/storage");
const storage = require("./services/storage");
const { runMigrations } = require("./services/migrations");

const adminRoutes = require("./routes/admin");
const normalCakeRoutes = require("./routes/normalCakes");
const customCakeRoutes = require("./routes/customCakes");
const categoryRoutes = require("./routes/categories");
const uploadRoutes = require("./routes/upload");
const imageRoutes = require("./routes/images");

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === "production";

// Behind Nginx the real client IP arrives via X-Forwarded-For (needed for rate limiting)
app.set("trust proxy", process.env.TRUST_PROXY ? Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY : isProd ? 1 : false);
app.disable("x-powered-by");

// ── Security ────────────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const allowedOrigins = [
  ...(process.env.FRONTEND_URL || "").split(",").map((s) => s.trim()).filter(Boolean),
  ...(isProd ? [] : ["http://localhost:5173", "http://localhost:3000", "http://localhost:4173"]),
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ── Uploaded images: public static files, registered BEFORE rate limiting ───
// Filenames are unique and never rewritten in place, so they are safe to cache "forever".
app.use(
  cfg.PUBLIC_PATH,
  express.static(cfg.UPLOAD_DIR, {
    index: false, // no directory listing / index
    dotfiles: "ignore", // hides .tmp
    maxAge: "30d",
    immutable: true,
    etag: true,
    fallthrough: false,
    setHeaders: (res) => res.setHeader("X-Content-Type-Options", "nosniff"),
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 600,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(express.json({ limit: "1mb" })); // images use multipart, not JSON
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/admin", adminRoutes);
app.use("/api/normal-cakes", normalCakeRoutes);
app.use("/api/custom-cakes", customCakeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/images", imageRoutes.admin);
app.use("/api/gallery", imageRoutes.gallery);

app.get("/api/health", (req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Global error handler (never leaks stack traces or filesystem paths)
app.use((err, req, res, next) => {
  if (err.status === 404 && req.path.startsWith(cfg.PUBLIC_PATH)) {
    return res.status(404).json({ error: "Image not found" });
  }
  const status = err.status || (err.code === "LIMIT_FILE_SIZE" ? 413 : 500);
  if (status >= 500) console.error("[ERROR]", err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
});

// ── Admin seeding ───────────────────────────────────────────────────────────
async function seedAdmin() {
  const Admin = require("./models/Admin");
  const bcrypt = require("bcryptjs");
  try {
    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!exists) {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
      await Admin.create({ email: process.env.ADMIN_EMAIL, passwordHash: hash });
      console.log(`[SEED] Admin created: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log(`[SEED] Admin already exists: ${process.env.ADMIN_EMAIL}`);
    }
  } catch (e) {
    console.error("[SEED ERROR]", e.message);
  }
}

async function start() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("[DB] Connected to MongoDB");

  await storage.ensureDirs();
  const stale = await storage.cleanupTemp();
  if (stale) console.log(`[STORAGE] removed ${stale} stale temp file(s)`);

  await seedAdmin();

  // One-time, tracked, idempotent migrations. They never reset or delete existing data.
  try {
    const result = await runMigrations();
    console.log("[MIGRATE]", JSON.stringify(result));
  } catch (err) {
    console.error("[MIGRATE] failed (server will still start):", err.message);
  }

  const stats = await storage.getStats({ fresh: true });
  console.log(
    `[STORAGE] ${cfg.UPLOAD_DIR} — ${(stats.usedBytes / cfg.MB).toFixed(1)} MB used of ` +
      `${(stats.limitBytes / cfg.GB).toFixed(2)} GB (${stats.percentUsed}%), ${stats.imageCount} images`
  );

  app.listen(PORT, () => console.log(`[SERVER] Sanjus Bakesvelle API running on port ${PORT}`));

  // Housekeeping: abandoned temp files from crashed uploads
  setInterval(() => storage.cleanupTemp().catch(() => {}), 30 * 60 * 1000).unref();
}

start().catch((err) => {
  console.error("[FATAL] startup failed:", err.message);
  process.exit(1);
});
