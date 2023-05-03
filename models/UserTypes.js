const mongoose = require("mongoose");

const UserTypeSchema = new mongoose.Schema(
  {
    userTypeName: {
      type: String,
      unique: true,
      enum: ["customer", "vendor", "admin"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("UserType", UserTypeSchema);
