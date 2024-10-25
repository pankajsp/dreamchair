const mongoose = require("mongoose");

const cabinetMemberSchema = new mongoose.Schema({
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
  cabinetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cabinet",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CabinetMember = mongoose.model("CabinetMember", cabinetMemberSchema);

module.exports = CabinetMember;
