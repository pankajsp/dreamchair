const mongoose = require("mongoose");

const ReferralBonusSchema = new mongoose.Schema({
  bonus: {
    type: Number,
    required: true,
  },
});
const ReferralBonus = mongoose.model("ReferralBonus", ReferralBonusSchema);

module.exports = ReferralBonus;
