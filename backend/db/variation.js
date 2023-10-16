const mongoose = require("mongoose");

const { Schema } = mongoose;

const VariationSchema = new Schema({
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
  name: String,
});

module.exports = mongoose.model("VariationSchema", VariationSchema);
