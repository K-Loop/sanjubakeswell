const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  weight: { type: String, default: "" },
  serves: { type: String, default: "" },
  price: { type: Number, default: 0 },
});

const CustomCakeDesignSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomCakeCategory",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    weight: { type: String, default: "" },
    serves: { type: String, default: "" },
    desc: { type: String, default: "" },
    image: { type: String, default: "" },
    cloudinaryPublicId: { type: String, default: "" },
    tag: { type: String, default: "" },
    rate: { type: Number, default: 0 },
    rateUnit: { type: String, default: "starting" },
    options: { type: [OptionSchema], default: [] },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomCakeDesign", CustomCakeDesignSchema);

