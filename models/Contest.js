const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Groups",
    required: true,
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  constituency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Constituency",
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

const Contest = mongoose.model("Contest", ContestSchema);

module.exports = Contest;
