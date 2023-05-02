const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    userDisplayName: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    authType: {
      type: String,
    },
    authKey: {
      type: String,
      select: false,
    },
    userType: {
      type: String,
      enum: ["customer", "vendor", "admin"],
    },
    userImage: {
      type: String,
    },
  },
  { timestamps: true }
);

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("authKey")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.authKey = await bcrypt.hash(this.authKey, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered authKey to hashed authKey in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.authKey);
};

module.exports = mongoose.model("User", UserSchema);
