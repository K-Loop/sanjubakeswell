const mongoose = require("mongoose");

const NormalCakeCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    categoryBadge: { type: String, default: "Fresh Artisan" },
    bgTheme: { type: String, default: "chocolate" },
    bgImage: { type: String, default: "" },
    featuredCakeImage: { type: String, default: "" },
    filters: { type: [String], default: ["All"] },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NormalCakeCategory", NormalCakeCategorySchema);

