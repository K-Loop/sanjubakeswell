const router = require("express").Router();
const CustomCakeCategory = require("../models/CustomCakeCategory");
const CustomCakeDesign = require("../models/CustomCakeDesign");
const authMiddleware = require("../middleware/auth");

// ── PUBLIC: GET /api/custom-cakes ─────────────────────────────────────────────
// Returns all active custom cake categories with their active designs
router.get("/", async (req, res) => {
  try {
    const categories = await CustomCakeCategory.find({ isActive: true }).sort({ displayOrder: 1 });
    const result = await Promise.all(
      categories.map(async (cat) => {
        const designs = await CustomCakeDesign.find({
          categoryId: cat._id,
          isActive: true,
        }).sort({ displayOrder: 1 });
        return {
          id: cat._id,
          name: cat.name,
          tagline: cat.tagline,
          badge: cat.badge,
          image: cat.image,
          desc: cat.desc,
          iconName: cat.iconName,
          types: designs.map((d) => ({
            id: d._id,
            name: d.name,
            weight: d.weight,
            serves: d.serves,
            desc: d.desc,
            image: d.image,
            tag: d.tag,
            rate: d.rate,
            rateUnit: d.rateUnit,
            options: d.options,
            isFeatured: d.isFeatured,
          })),
        };
      })
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch custom cakes" });
  }
});

// ── ADMIN: GET /api/custom-cakes/admin/categories ─────────────────────────────
router.get("/admin/categories", authMiddleware, async (req, res) => {
  try {
    const cats = await CustomCakeCategory.find().sort({ displayOrder: 1 });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch custom categories" });
  }
});

// ── ADMIN: POST /api/custom-cakes/admin/categories ────────────────────────────
router.post("/admin/categories", authMiddleware, async (req, res) => {
  try {
    const count = await CustomCakeCategory.countDocuments();
    const cat = await CustomCakeCategory.create({ ...req.body, displayOrder: count });
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: PUT /api/custom-cakes/admin/categories/:id ─────────────────────────
router.put("/admin/categories/:id", authMiddleware, async (req, res) => {
  try {
    const cat = await CustomCakeCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cat) return res.status(404).json({ error: "Category not found" });
    res.json(cat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: DELETE /api/custom-cakes/admin/categories/:id ──────────────────────
router.delete("/admin/categories/:id", authMiddleware, async (req, res) => {
  try {
    await CustomCakeDesign.deleteMany({ categoryId: req.params.id });
    await CustomCakeCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Custom category and its designs deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: GET /api/custom-cakes/admin/designs ────────────────────────────────
router.get("/admin/designs", authMiddleware, async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = categoryId && categoryId !== "all" ? { categoryId } : {};
    const designs = await CustomCakeDesign.find(filter)
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });
    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch designs" });
  }
});

// ── ADMIN: POST /api/custom-cakes/admin/designs ───────────────────────────────
router.post("/admin/designs", authMiddleware, async (req, res) => {
  try {
    const count = await CustomCakeDesign.countDocuments({ categoryId: req.body.categoryId });
    const design = await CustomCakeDesign.create({ ...req.body, displayOrder: count });
    res.status(201).json(design);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: PUT /api/custom-cakes/admin/designs/:id ────────────────────────────
router.put("/admin/designs/:id", authMiddleware, async (req, res) => {
  try {
    const design = await CustomCakeDesign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!design) return res.status(404).json({ error: "Design not found" });
    res.json(design);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: DELETE /api/custom-cakes/admin/designs/:id ────────────────────────
router.delete("/admin/designs/:id", authMiddleware, async (req, res) => {
  try {
    const design = await CustomCakeDesign.findByIdAndDelete(req.params.id);
    if (!design) return res.status(404).json({ error: "Design not found" });
    res.json({ message: "Design deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

