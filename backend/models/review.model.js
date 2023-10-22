const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteUser",
  },
  rating: Number,
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isHidden: Boolean,
});

module.exports = mongoose.model("Review", ReviewSchema);
