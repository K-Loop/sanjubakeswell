const mongoose = require("mongoose");

const CustomCakeCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: "" },
    badge: { type: String, default: "" },
    image: { type: String, default: "" },
    cloudinaryPublicId: { type: String, default: "" },
    desc: { type: String, default: "" },
    iconName: { type: String, default: "FaStar" },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomCakeCategory", CustomCakeCategorySchema);

