const mongoose = require("mongoose");

const knownPersonSchema = new mongoose.Schema({
  person_id: { type: String, unique: true },
  name: String,
  last_seen: Date,
  cameras_seen: [String],
});

module.exports = mongoose.model("KnownPerson", knownPersonSchema);