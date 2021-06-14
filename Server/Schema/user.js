const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true, //convert into hash while submitting into db
  },
});
module.exports = mongoose.model("user", userSchema);
