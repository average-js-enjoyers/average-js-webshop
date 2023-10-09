const mongoose = require("mongoose");

const { Schema } = mongoose;

const PaymentTypeSchema = new Schema({
  value: String,
});

module.exports = mongoose.model("PaymentType", PaymentTypeSchema);
