const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderLineSchema = new Schema({
  productItemID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductItem",
  },
  orderID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  quantity: Number,
  priceNet: Number,
  taxPercentage: Number,
});

module.exports = mongoose.model("OrderLine", OrderLineSchema);
