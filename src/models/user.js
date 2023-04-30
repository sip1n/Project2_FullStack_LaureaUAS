const mongoose = require('mongoose');

// Create mongoose model for User (email, password, channels)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  channels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "channel"
  }]

});

module.exports = mongoose.model('User', userSchema);