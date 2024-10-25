const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
  refferedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refferedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Referral = mongoose.model("Referral", ReferralSchema);

module.exports = Referral;
