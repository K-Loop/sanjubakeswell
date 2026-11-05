const mongoose = require("mongoose");

/** Tracks one-time data migrations / seeds so they never run twice. */
const MigrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    completedAt: { type: Date, default: Date.now },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Migration", MigrationSchema);

