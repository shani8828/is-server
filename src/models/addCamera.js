// models/Camera.js
const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ipAddress: { 
    type: String, 
    required: true,
    // Validates the format: http://xxx.xxx.xxx.xxx:port/video
    match: [/^http:\/\/\d{1,3}(\.\d{1,3}){3}:\d+\/.+$/, 'Please use a valid IP stream URL']
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Camera', cameraSchema);