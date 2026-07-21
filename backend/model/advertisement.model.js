const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    position: {
      type: String,
      enum: ["hero", "top-banner", "in-feed", "sidebar", "bottom-banner", "popup"],
      default: "in-feed",
    },
    type: {
      type: String,
      enum: ["clothing", "appliance", "general"],
      default: "general",
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    priority: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advertisement", advertisementSchema);

