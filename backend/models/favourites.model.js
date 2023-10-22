const mongoose = require("mongoose");

const { Schema } = mongoose;

const FavouriteSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteUser",
  },
  productID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

module.exports = mongoose.model("Favourite", FavouriteSchema);
