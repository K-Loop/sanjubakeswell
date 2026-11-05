const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const Admin = require("../models/Admin");
const authMiddleware = require("../middleware/auth");
const NormalCake = require("../models/NormalCake");
const NormalCakeCategory = require("../models/NormalCakeCategory");
const CustomCakeCategory = require("../models/CustomCakeCategory");
const CustomCakeDesign = require("../models/CustomCakeDesign");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: "Too many login attempts, please try again later." },
});

// ── POST /api/admin/login ────────────────────────────────────────────────────
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin)
      return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name, lastLogin: admin.lastLogin },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// ── GET /api/admin/me ────────────────────────────────────────────────────────
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-passwordHash");
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admin" });
  }
});

// ── PUT /api/admin/password ──────────────────────────────────────────────────
router.put("/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ error: "Current password is incorrect" });

    admin.passwordHash = await bcrypt.hash(newPassword, 12);
    await admin.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update password" });
  }
});

// ── GET /api/admin/stats ─────────────────────────────────────────────────────
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const [
      totalNormalCategories,
      totalCustomCategories,
      totalNormalCakes,
      totalCustomDesigns,
      activeNormalCakes,
      inactiveNormalCakes,
      recentNormalCakes,
      recentCustomDesigns,
    ] = await Promise.all([
      NormalCakeCategory.countDocuments(),
      CustomCakeCategory.countDocuments(),
      NormalCake.countDocuments(),
      CustomCakeDesign.countDocuments(),
      NormalCake.countDocuments({ availability: "active" }),
      NormalCake.countDocuments({ availability: "inactive" }),
      NormalCake.find().sort({ createdAt: -1 }).limit(5).select("name image createdAt availability"),
      CustomCakeDesign.find().sort({ createdAt: -1 }).limit(5).select("name image createdAt isActive"),
    ]);

    res.json({
      totalNormalCategories,
      totalCustomCategories,
      totalNormalCakes,
      totalCustomDesigns,
      activeNormalCakes,
      inactiveNormalCakes,
      totalActive: activeNormalCakes,
      totalInactive: inactiveNormalCakes,
      recentNormalCakes,
      recentCustomDesigns,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ── POST /api/admin/seed ─────────────────────────────────────────────────────
// Adds ONLY missing catalogue records (by natural key). Never edits or deletes existing data,
// so it is safe to run in production. Destructive resets are CLI-only (`npm run seed -- --reset`).
router.post("/seed", authMiddleware, async (req, res) => {
  try {
    const { seedCatalogue } = require("../services/seeder");
    const stats = await seedCatalogue();
    const added = Object.values(stats.inserted).reduce((a, b) => a + b, 0);
    res.json({
      message: added ? `Added ${added} missing catalogue record(s).` : "Catalogue is already up to date.",
      stats,
    });
  } catch (err) {
    console.error("[SEED]", err);
    res.status(500).json({ error: "Failed to seed catalogue" });
  }
});

module.exports = router;

