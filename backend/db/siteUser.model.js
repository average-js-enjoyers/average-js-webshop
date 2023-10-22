const mongoose = require("mongoose");

const { Schema } = mongoose;

const SiteUserSchema = new Schema({
  emailAddress: String,
  phoneNumber: {
    type: Number,
    default: null
  },
  password: String,
  firstName: String,
  lastName: String,
  profilePhoto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    default: null
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLoginDate: {
    type: Date,
    default: Date.now
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("SiteUser", SiteUserSchema);
