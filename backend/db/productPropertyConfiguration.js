const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductPropertyConfigurationSchema = new Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  propertyOptionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyOption",
  },
});

module.exports = mongoose.model(
  "ProductPropertyConfiguration",
  ProductPropertyConfigurationSchema
);
