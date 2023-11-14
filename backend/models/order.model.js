const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  orderDate: Date,
  paymentMethodID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod',
  },
  isPaid: Boolean,
  shippingAddressID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  billingAddressID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  shippingMethodID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingMethod',
  },
  orderTotalNet: Number,
  orderTotalVat: Number,
  orderTotalGross: Number,
  orderStatus: String,
  orderLines: [],
});

module.exports = mongoose.model('Order', OrderSchema);
