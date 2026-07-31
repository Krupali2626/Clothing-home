const mongoose = require("mongoose");

// An immutable audit log for every stock change. Stock remains on Product for
// fast storefront reads; this collection answers where a quantity came from.
const stockMovementSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    type: { type: String, enum: ["in", "out", "adjustment", "sale", "return"], required: true },
    quantity: { type: Number, required: true }, // signed: in/return positive, out/sale negative
    previousStock: { type: Number, required: true, min: 0 },
    resultingStock: { type: Number, required: true, min: 0 },
    reason: { type: String, trim: true, maxlength: 500, default: "" },
    reference: { type: String, trim: true, maxlength: 100, default: "" },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

stockMovementSchema.index({ product: 1, createdAt: -1 });
module.exports = mongoose.model("StockMovement", stockMovementSchema);
