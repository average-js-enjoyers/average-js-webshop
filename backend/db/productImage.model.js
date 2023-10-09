const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductImageSchema = new Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  imageID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  isDefault: Boolean,
});

module.exports = mongoose.model("ProductImage", ProductImageSchema);
