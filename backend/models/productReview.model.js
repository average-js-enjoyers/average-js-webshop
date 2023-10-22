const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductReviewSchema = new Schema({
  reviewID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductReview",
  },
  productID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("ProductReview", ProductReviewSchema);
