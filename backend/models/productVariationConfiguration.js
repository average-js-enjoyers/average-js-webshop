const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductVariationConfigurationSchema = new Schema({
  productItemID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductItem",
  },
  variationOptionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VariationOption",
  },
});

module.exports = mongoose.model(
  "ProductVariationConfiguration",
  ProductVariationConfigurationSchema
);
