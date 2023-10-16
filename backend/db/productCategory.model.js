import mongoose, { Mongoose } from "mongoose";

const { Schema } = mongoose;

const ProductCategorySchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  categoryName: String,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);

export default ProductCategory;
