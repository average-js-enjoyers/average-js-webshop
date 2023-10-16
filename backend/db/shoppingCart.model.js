const mongoose = require("mongoose");

const { Schema } = mongoose;

const ShoppingCartSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteUser",
  },
});

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
