const mongoose = require("mongoose");

const mlaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
  partyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
    required: true,
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  constituencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Constituency",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MLA = mongoose.model("MLA", mlaSchema);

module.exports = MLA;
