const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserPaymentMethodSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteUser",
  },
  paymentTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentType",
  },
  isDefault: Boolean,
});

module.exports = mongoose.model("UserPaymentMethod", UserPaymentMethodSchema);
