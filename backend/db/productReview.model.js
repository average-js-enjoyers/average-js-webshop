const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductReviewSchema = new Schema({
  productID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("ProductReview", ProductReviewSchema);
