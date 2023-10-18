const mongoose = require("mongoose");

const { Schema } = mongoose;

const ShoppingCartItemSchema = new Schema({
  shoppingCartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShoppingCart",
  },
  productItemID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductItem",
  },
  quantity: Number,
});

module.exports = mongoose.model("ShoppingCartItem", ShoppingCartItemSchema);
