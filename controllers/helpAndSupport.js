const HelpAndSupport = require("../models/helpAndSupport");

exports.getHelpAndSupport = async (req, res) => {
  try {
    const helpAndSupport = await HelpAndSupport.find();
    res.status(200).json({ helpAndSupport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.helpAndSupport = async (req, res) => {
  try {
    const { issue, description } = req.body;
    const helpAndSupport = new HelpAndSupport({
      user: req.user._id,
      issue,
      description,
    });
    await helpAndSupport.save();
    res
      .status(200)
      .json({ message: "Help and support submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateHelpAndSupport = async (req, res) => {
  try {
    await HelpAndSupport.findByIdAndUpdate(req.params.id, {
      status: "resolved",
    });
    res.status(200).json({ message: "Help and support updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHelpAndSupport = async (req, res) => {
  try {
    await HelpAndSupport.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Help and support deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.helpAndSupportAdmin = async (req, res) => {
  try {
    const helpAndSupportData = await HelpAndSupport.find().populate("user");

    res.status(200).json({ helpAndSupportData });
  } catch (error) {
    console.error("Error fetching HelpAndSupport data:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHelpAndSupportAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHelpAndSupport = await HelpAndSupport.findByIdAndDelete(id);

    if (!deletedHelpAndSupport) {
      return res
        .status(404)
        .json({ message: "Help and Support entry not found" });
    }

    res
      .status(200)
      .json({ message: "Help and Support entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting HelpAndSupport entry:", error);
    res.status(500).json({ message: error.message });
  }
};
