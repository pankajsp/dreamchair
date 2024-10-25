const mongoose = require("mongoose");

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Constituency = mongoose.model("Constituency", constituencySchema);

module.exports = Constituency;
