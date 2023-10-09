const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserAddressSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteUser",
  },
  adressID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  isDefault: Boolean,
});

module.exports = mongoose.model("UserAddress", UserAddressSchema);
