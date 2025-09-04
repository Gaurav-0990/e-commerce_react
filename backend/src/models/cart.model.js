const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

// ✅ Ensure each user can only have one entry per product
cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
