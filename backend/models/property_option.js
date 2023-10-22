const mongoose = require("mongoose");

const { Schema } = mongoose;

const PropertyOptionSchema = new Schema({
  propertyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  value: String,
});

module.exports = mongoose.model("PropertyOption", PropertyOptionSchema);
