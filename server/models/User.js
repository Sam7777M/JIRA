const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    select: false
  },
  picture: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'pm', 'developer'],
    default: 'developer'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
