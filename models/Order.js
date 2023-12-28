const mongoose = require("mongoose");

const OrderedProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  priceAtOrder: Number,
  quantity: { type: Number, default: 1 },
});

const OrderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  products: [OrderedProductSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Order", OrderSchema);
