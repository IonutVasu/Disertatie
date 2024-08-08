const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  players: {
    type: Number,
    required: true,
  },
  indoor: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: false,
  },
  difficultyLevel: {
    type: String,
    required: false,
    enum: ["beginner", "intermediate", "advanced"],
  },
});

module.exports = mongoose.model("Sport", sportSchema);
