const mongoose = require("mongoose");

const { Schema } = mongoose;

const ImageSchema = new Schema({
  URL: URL,
});

module.exports = mongoose.model("Image", ImageSchema);
