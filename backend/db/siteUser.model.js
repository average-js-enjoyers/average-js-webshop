const mongoose = require("mongoose");

const { Schema } = mongoose;

const SiteUserSchema = new Schema({
  emailAddress: String,
  phoneNumber: Number,
  password: String,
  firstName: String,
  lastName: String,
  profilePhoto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLoginDate: Date,
  isBanned: Boolean,
  twoFactorEnabled: Boolean,
});

module.exports = mongoose.model("SiteUser", SiteUserSchema);
