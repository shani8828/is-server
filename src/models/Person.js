const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  name: String,
  embedding: [Number],
  images: [String],
});

module.exports = mongoose.model("Person", PersonSchema);