const mongoose = require('mongoose');

const addPersonSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  position: { 
    type: String, 
    required: true, 
    enum: ['Owner', 'Manager', 'Staff', 'Student', 'Guest'] 
  },
  images: { 
    type: [String], // Array of Base64 strings
    validate: [arrayLimit, '{PATH} needs at least 10 images for accurate embeddings']
  },
  createdAt: { type: Date, default: Date.now }
});

function arrayLimit(val) {
  return val.length >= 10;
}

module.exports = mongoose.model('Person', addPersonSchema);