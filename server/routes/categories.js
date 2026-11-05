const router = require("express").Router();
const NormalCakeCategory = require("../models/NormalCakeCategory");
const CustomCakeCategory = require("../models/CustomCakeCategory");

// ── GET /api/categories — public endpoint that returns both types
router.get("/", async (req, res) => {
  try {
    const { type } = req.query; // 'normal' | 'custom' | undefined (both)
    const result = {};

    if (!type || type === "normal") {
      result.normal = await NormalCakeCategory.find({ isActive: true }).sort({ displayOrder: 1 });
    }
    if (!type || type === "custom") {
      result.custom = await CustomCakeCategory.find({ isActive: true }).sort({ displayOrder: 1 });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;

