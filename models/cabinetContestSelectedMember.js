const mongoose = require("mongoose");

const cabinetContestSelectedMemberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      cabinetMemberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CabinetMember",
        required: true,
      },
      prediction: {
        type: String,
        default: "",
      },
    },
  ],
  cabinetContestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CabinetContest",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CabinetContestSelectedMember = mongoose.model(
  "CabinetContestSelectedMember",
  cabinetContestSelectedMemberSchema
);

module.exports = CabinetContestSelectedMember;
