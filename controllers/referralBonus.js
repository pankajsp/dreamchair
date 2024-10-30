const ReferralBonus = require("../models/referralBonus");

exports.referralBonus = async (req, res) => {
  try {
    const referralBonus = await ReferralBonus.find();
    res.status(200).json(referralBonus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReferralBonus = async (req, res) => {
  try {
    const { bonus } = req.body;
    const referralBonus = await ReferralBonus.findByIdAndUpdate(
      "66eeaa864108a363a51b2735",
      {
        bonus,
      }
    );
    await referralBonus.save();
    res.status(200).json({ message: "Referral bonus updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
