const mongoose = require("mongoose");

const ExitPollContestSchema = new mongoose.Schema({
  exitPoll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExitPoll",
    required: true,
  },
  spots: {
    type: Number,
    required: true,
  },
  spotsFilled: {
    type: Number,
    default: 0,
  },
  entryFee: {
    type: Number,
    required: true,
  },
  prizePool: {
    type: Number,
    required: true,
  },
  winingAmount: {
    type: Number,
    required: true,
  },
  upTo: {
    type: Number,
    required: true,
  },
  teamsWin: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExitPollContest = mongoose.model(
  "ExitPollContest",
  ExitPollContestSchema
);

module.exports = ExitPollContest;
