const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema({
  categoryName: String,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Category", CategorySchema);
