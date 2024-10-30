const mongoose = require("mongoose");

const privacyPolicySchema = new mongoose.Schema({
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PrivacyPolicy = mongoose.model("PrivacyPolicy", privacyPolicySchema);

module.exports = PrivacyPolicy;
