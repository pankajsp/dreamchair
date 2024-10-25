const mongoose = require("mongoose");

const exitPollSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  sortName: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExitPoll = mongoose.model("ExitPoll", exitPollSchema);

module.exports = ExitPoll;
