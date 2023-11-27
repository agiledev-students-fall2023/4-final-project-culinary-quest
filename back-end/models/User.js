const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  // other fields as needed
});

const User = mongoose.model('User', UserSchema);

module.exports = User;