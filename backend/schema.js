const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
