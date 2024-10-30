const mongoose = require("mongoose");

const HelpAndSupportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending",
  },
});

const HelpAndSupport = mongoose.model("HelpAndSupport", HelpAndSupportSchema);

module.exports = HelpAndSupport;
