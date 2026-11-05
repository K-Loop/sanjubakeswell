const router = require("express").Router();
const NormalCake = require("../models/NormalCake");
const NormalCakeCategory = require("../models/NormalCakeCategory");
const authMiddleware = require("../middleware/auth");

// ── PUBLIC: GET /api/normal-cakes ─────────────────────────────────────────────
// Returns all active categories with their active cakes populated
router.get("/", async (req, res) => {
  try {
    const categories = await NormalCakeCategory.find({ isActive: true }).sort({ displayOrder: 1 });
    const result = await Promise.all(
      categories.map(async (cat) => {
        const cakes = await NormalCake.find({
          sectionId: cat._id,
          availability: "active",
        }).sort({ displayOrder: 1 });
        return {
          id: cat._id,
          name: cat.name,
          subtitle: cat.subtitle,
          categoryBadge: cat.categoryBadge,
          bgTheme: cat.bgTheme,
          bgImage: cat.bgImage,
          featuredCake: cat.featuredCakeImage,
          filters: cat.filters,
          items: cakes.map((c) => ({
            id: c._id,
            name: c.name,
            description: c.description,
            image: c.image,
            priceHalf: c.priceHalf,
            priceOne: c.priceOne,
            rating: c.rating,
            isBestSeller: c.isBestSeller,
            category: c.category || c.flavour,
            flavour: c.flavour,
            availability: c.availability,
          })),
        };
      })
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch normal cakes" });
  }
});

// ── PUBLIC: GET /api/normal-cakes/all-cakes ───────────────────────────────────
router.get("/all-cakes", async (req, res) => {
  try {
    const cakes = await NormalCake.find().populate("sectionId", "name").sort({ createdAt: -1 });
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cakes" });
  }
});

// ── ADMIN: GET /api/normal-cakes/admin/list ───────────────────────────────────
router.get("/admin/list", authMiddleware, async (req, res) => {
  try {
    const { search, sectionId, availability } = req.query;
    const filter = {};
    if (sectionId && sectionId !== "all" && sectionId !== "") filter.sectionId = sectionId;
    if (availability && availability !== "all" && availability !== "") filter.availability = availability;
    if (search && search.trim() !== "") {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
        { flavour: { $regex: escaped, $options: "i" } },
      ];
    }

    const cakes = await NormalCake.find(filter)
      .populate("sectionId", "name")
      .sort({ createdAt: -1 });
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cakes: " + err.message });
  }
});

// ── ADMIN: GET /api/normal-cakes/admin/categories ────────────────────────────
router.get("/admin/categories", authMiddleware, async (req, res) => {
  try {
    const cats = await NormalCakeCategory.find().sort({ displayOrder: 1 });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// ── ADMIN: POST /api/normal-cakes/admin/categories ───────────────────────────
router.post("/admin/categories", authMiddleware, async (req, res) => {
  try {
    const count = await NormalCakeCategory.countDocuments();
    const cat = await NormalCakeCategory.create({ ...req.body, displayOrder: count });
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: PUT /api/normal-cakes/admin/categories/:id ────────────────────────
router.put("/admin/categories/:id", authMiddleware, async (req, res) => {
  try {
    const cat = await NormalCakeCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cat) return res.status(404).json({ error: "Category not found" });
    res.json(cat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: DELETE /api/normal-cakes/admin/categories/:id ─────────────────────
router.delete("/admin/categories/:id", authMiddleware, async (req, res) => {
  try {
    const cakesInSection = await NormalCake.countDocuments({ sectionId: req.params.id });
    if (cakesInSection > 0) {
      // Reassign cakes to another available section
      const fallback = await NormalCakeCategory.findOne({ _id: { $ne: req.params.id } });
      if (fallback) {
        await NormalCake.updateMany({ sectionId: req.params.id }, { sectionId: fallback._id });
      }
    }
    await NormalCakeCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: POST /api/normal-cakes/admin/cakes ────────────────────────────────
router.post("/admin/cakes", authMiddleware, async (req, res) => {
  try {
    const count = await NormalCake.countDocuments({ sectionId: req.body.sectionId });
    const cake = await NormalCake.create({ ...req.body, displayOrder: count });
    res.status(201).json(cake);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: PUT /api/normal-cakes/admin/cakes/:id ─────────────────────────────
router.put("/admin/cakes/:id", authMiddleware, async (req, res) => {
  try {
    const cake = await NormalCake.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cake) return res.status(404).json({ error: "Cake not found" });
    res.json(cake);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── ADMIN: DELETE /api/normal-cakes/admin/cakes/:id ──────────────────────────
router.delete("/admin/cakes/:id", authMiddleware, async (req, res) => {
  try {
    const cake = await NormalCake.findByIdAndDelete(req.params.id);
    if (!cake) return res.status(404).json({ error: "Cake not found" });
    res.json({ message: "Cake deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

