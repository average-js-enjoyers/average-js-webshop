const mongoose = require("mongoose");

const { Schema } = mongoose;

const ShopOrderSchema = new Schema({
  userID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteUser",
  },
  orderDate:{
    type: Date,
    default: Date.now,
  },
  paymentMethodID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserPaymentMethod",
  },
  shippingAddress:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  billingAddress:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  shippingMethod:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingMethod",
  },
  orderTotalNet: Number,
  orderTotalVat: Number,
  orderTotalGross: Number,
  orderStatus:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderStatus",
  },
});

module.exports = mongoose.model("ShopOrder", ShopOrderSchema);

