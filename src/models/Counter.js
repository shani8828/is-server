const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  session_id: { type: String,  unique: true }, // Tied to specific session
  knownCount: { type: Number, default: 0 },
  unknownCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Counter", counterSchema);