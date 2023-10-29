const mongoose = require('mongoose');

const { Schema } = mongoose;

const AddressSchema = new Schema({
  unitNumber: Number,
  streetNumber: Number,
  addressLine1: String,
  addressLine2: String,
  city: String,
  region: String,
  postalCode: Number,
  vatID: Number,
  country: String,
  type: String,
});

module.exports = mongoose.model('Address', AddressSchema);
