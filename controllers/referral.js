const Referral = require("../models/referral");

exports.getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find()
      .populate("refferedBy")
      .populate("refferedTo");
    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
