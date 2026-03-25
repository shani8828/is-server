const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  label: { type: String, required: true },
  confidence: { type: Number },
  imagePath: { type: String, required: true }, // Local path or URL
  cameraId: { type: String, default: "cam_01" },
  trackId: { type: String },
  is_known: { type: Boolean },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', PersonSchema);