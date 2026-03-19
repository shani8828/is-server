const mongoose = require("mongoose");

const CameraSchema = new mongoose.Schema({
  name: String,
  rtspUrl: String,
  location: String,
});

module.exports = mongoose.model("Camera", CameraSchema);