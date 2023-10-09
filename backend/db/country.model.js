const mongoose = require("mongoose");

const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Country", CountrySchema);
