const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductCategorySchema = new Schema({
  ProductCategoryName: String,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
});

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
