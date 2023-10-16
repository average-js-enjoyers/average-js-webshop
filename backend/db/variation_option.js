const mongoose = require("mongoose");

const { Schema } = mongoose;

const VariationOptionSchema = new Schema({
  variationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variation",
  },
  value: String,
});

module.exports = mongoose.model("VariationOption", VariationOptionSchema);
