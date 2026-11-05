const NormalCakeCategory = require("../models/NormalCakeCategory");
const NormalCake = require("../models/NormalCake");
const CustomCakeCategory = require("../models/CustomCakeCategory");
const CustomCakeDesign = require("../models/CustomCakeDesign");
const seedData = require("../data/seedData.json");

/**
 * Idempotent, NON-DESTRUCTIVE catalogue seeding.
 * Only inserts records whose natural key is missing:
 *   category -> name,   cake -> (category, name),   design -> (category, name)
 * Existing documents (including admin edits) are never modified or deleted.
 */
async function seedCatalogue() {
  const inserted = { normalCategories: 0, normalCakes: 0, customCategories: 0, customDesigns: 0 };

  const { COLLECTIONS, CUSTOM_CATEGORIES } = seedData;

  for (let i = 0; i < COLLECTIONS.length; i++) {
    const col = COLLECTIONS[i];
    const name = col.title || col.name;

    let category = await NormalCakeCategory.findOne({ name });
    if (!category) {
      category = await NormalCakeCategory.create({
        name,
        subtitle: col.subtitle || "",
        categoryBadge: col.categoryBadge || "Fresh Artisan",
        bgTheme: col.bgTheme || "chocolate",
        bgImage: col.bgImage || "",
        featuredCakeImage: col.featuredCake || (col.items && col.items[0] && col.items[0].image) || "",
        filters: col.filters && col.filters.length > 0 ? col.filters : ["All"],
        displayOrder: i,
        isActive: true,
      });
      inserted.normalCategories++;
    }

    for (let j = 0; j < (col.items || []).length; j++) {
      const item = col.items[j];
      if (await NormalCake.exists({ sectionId: category._id, name: item.name })) continue;
      await NormalCake.create({
        name: item.name,
        description: item.description || "",
        image: item.image || "",
        sectionId: category._id,
        flavour: item.flavour || item.category || "",
        category: item.category || "",
        priceHalf: item.priceHalf || 0,
        priceOne: item.priceOne || 0,
        rating: item.rating || 4.9,
        isBestSeller: !!item.isBestSeller,
        isFeatured: !!item.isBestSeller,
        availability: "active",
        displayOrder: j,
      });
      inserted.normalCakes++;
    }
  }

  const keys = Object.keys(CUSTOM_CATEGORIES);
  for (let i = 0; i < keys.length; i++) {
    const cat = CUSTOM_CATEGORIES[keys[i]];

    let category = await CustomCakeCategory.findOne({ name: cat.name });
    if (!category) {
      category = await CustomCakeCategory.create({
        name: cat.name,
        tagline: cat.tagline || "",
        badge: cat.badge || (cat.theme && cat.theme.badge) || "Bespoke",
        image: cat.image || (cat.types && cat.types[0] && cat.types[0].image) || "",
        desc: cat.desc || cat.tagline || "",
        iconName: cat.iconName || "FaStar",
        displayOrder: i,
        isActive: true,
      });
      inserted.customCategories++;
    }

    for (let j = 0; j < (cat.types || []).length; j++) {
      const t = cat.types[j];
      if (await CustomCakeDesign.exists({ categoryId: category._id, name: t.name })) continue;
      await CustomCakeDesign.create({
        categoryId: category._id,
        name: t.name,
        weight: t.weight || "",
        serves: t.serves || "",
        desc: t.desc || "",
        image: t.image || "",
        tag: t.tag || "",
        rate: t.rate || 0,
        rateUnit: t.rateUnit || "starting",
        options: t.options || [],
        isFeatured: t.tag === "Bestseller" || t.tag === "Weddings & Galas",
        isActive: true,
        displayOrder: j,
      });
      inserted.customDesigns++;
    }
  }

  return {
    normalCategories: await NormalCakeCategory.countDocuments(),
    normalCakes: await NormalCake.countDocuments(),
    customCategories: await CustomCakeCategory.countDocuments(),
    customDesigns: await CustomCakeDesign.countDocuments(),
    inserted,
  };
}

/** DESTRUCTIVE — only used by the explicit `npm run seed -- --reset` CLI. */
async function resetCatalogue() {
  await NormalCake.deleteMany({});
  await NormalCakeCategory.deleteMany({});
  await CustomCakeDesign.deleteMany({});
  await CustomCakeCategory.deleteMany({});
  return seedCatalogue();
}

module.exports = { seedCatalogue, resetCatalogue };
