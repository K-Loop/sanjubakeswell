const mongoose = require("mongoose");

const NormalCakeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    cloudinaryPublicId: { type: String, default: "" },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NormalCakeCategory",
      required: true,
    },
    flavour: { type: String, default: "" },
    category: { type: String, default: "" },
    priceHalf: { type: Number, default: 0 },  // 0.5 kg price
    priceOne: { type: Number, default: 0 },   // 1 kg price
    rating: { type: Number, default: 4.9, min: 0, max: 5 },
    isBestSeller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    availability: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    customisationOptions: { type: [String], default: [] },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Text index for search
NormalCakeSchema.index({ name: "text", description: "text", flavour: "text" });

module.exports = mongoose.model("NormalCake", NormalCakeSchema);

