const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  total: Number,//no need i guess, it is the sum of rest 2
  known: Number,
  unknown: Number,
});

module.exports = mongoose.model("Stats", StatsSchema);