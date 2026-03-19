const mongoose = require("mongoose");

const unknownSchema = new mongoose.Schema({
  temp_id: { type: String, unique: true },
  first_seen: Date,
  last_seen: Date,
  cameras_seen: [String],
});

module.exports = mongoose.model("UnknownPerson", unknownSchema);