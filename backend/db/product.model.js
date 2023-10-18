import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
  name: String,
  description: String,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
