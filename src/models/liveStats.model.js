const mongoose = require("mongoose");

const liveStatsSchema = new mongoose.Schema(
  {
    totalKnown: { type: Number, default: 0 },
    totalUnknown: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveStats", liveStatsSchema);