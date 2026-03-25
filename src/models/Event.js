const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    event_id: String,
    timestamp: Date,
    camera_id: String,
    track_id: String,
    is_known: Boolean,
    person_id: String,
    confidence: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);