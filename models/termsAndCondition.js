const mongoose = require("mongoose");

const termsAndConditionSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TermsAndCondition = mongoose.model(
  "TermsAndCondition",
  termsAndConditionSchema
);

module.exports = TermsAndCondition;
