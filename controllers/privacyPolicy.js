const PrivacyPolicy = require("../models/privacyPolicy");

exports.privacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findById(
      "671218fb0b5554716faa08bd"
    );
    res.status(200).json({ privacyPolicy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.createPrivacyPolicy = async (req, res) => {
//   try {
//     const { description } = req.body;
//     const privacyPolicy = await PrivacyPolicy.create({ description });
//     res.status(201).json({ privacyPolicy });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const { description } = req.body;
    const privacyPolicy = await PrivacyPolicy.findByIdAndUpdate(
      "671218fb0b5554716faa08bd",
      { description },
      { new: true }
    );
    res.status(200).json({ privacyPolicy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
