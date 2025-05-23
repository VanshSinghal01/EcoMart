const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expire after 5 minutes
});

const TempUser = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUser;
