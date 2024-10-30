const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema({
  partyA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
    required: true,
  },
  partyB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
    required: true,
  },
  partyC: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
    required: false,
  },
  partyD: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Groups = mongoose.model("Groups", groupsSchema);

module.exports = Groups;
