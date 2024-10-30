const TermsAndCondition = require("../models/termsAndCondition");

exports.termsAndCondition = async (req, res) => {
  try {
    const termsAndCondition = await TermsAndCondition.findById(
      "67121b11a9d52eadf6f5e30e"
    );
    res.status(200).json({ termsAndCondition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTermsAndCondition = async (req, res) => {
  try {
    const { description } = req.body;
    const termsAndCondition = await TermsAndCondition.findByIdAndUpdate(
      "67121b11a9d52eadf6f5e30e",
      { description },
      { new: true }
    );
    res.status(200).json({ termsAndCondition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
