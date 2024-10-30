const mongoose = require("mongoose");

const selectedMlaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mlaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MLA",
    required: true,
  },
  predictionSeat: {
    type: String,
    required: true,
  },
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SelectedMLA = mongoose.model("SelectedMLA", selectedMlaSchema);

module.exports = SelectedMLA;
