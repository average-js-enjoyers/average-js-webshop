const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  SKU: String,
  quantityInStock: Number,
  priceNet: Number,
  taxPercentage: Number,
});

module.exports = mongoose.model("ProductItem", ProductItemSchema);
