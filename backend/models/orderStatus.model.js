const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderStatusSchema = new Schema({
  status: String,
});

module.exports = mongoose.model("OrderStatus", OrderStatusSchema);
