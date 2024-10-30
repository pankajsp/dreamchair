const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
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

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
