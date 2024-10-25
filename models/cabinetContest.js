const mongoose = require("mongoose");

const CabinetContestSchema = new mongoose.Schema({
  cabinet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cabinet",
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

const CabinetContest = mongoose.model("CabinetContest", CabinetContestSchema);

module.exports = CabinetContest;
