const mongoose = require("mongoose");

const exitPollPredictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exitPollContestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExitPollContest",
    required: true,
  },
  prediction: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExitPollPrediction = mongoose.model(
  "ExitPollPrediction",
  exitPollPredictionSchema
);

module.exports = ExitPollPrediction;
