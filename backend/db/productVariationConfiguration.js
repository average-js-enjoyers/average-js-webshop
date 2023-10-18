import mongoose, { Mongoose } from "mongoose";

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

export default mongoose.model(
  "ProductVariationConfiguration",
  ProductVariationConfigurationSchema
);
