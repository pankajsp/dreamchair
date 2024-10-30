const Party = require("../models/party");

exports.addParty = async (req, res) => {
  try {
    const { name, sortName } = req.body;
    const existingParty = await Party.findOne({ name });
    if (existingParty) {
      return res.json({ message: "Party with the same name already exists" });
    }
    const image = req.file.path;
    const party = new Party({ name, sortName, image });
    await party.save();
    res.status(200).json({ message: "Party added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePartyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sortName } = req.body;
    const updateData = { name, sortName };

    const existingParty = await Party.findOne({ name });
    if (existingParty && existingParty._id.toString() !== id) {
      return res.json({ message: "Party with the same name already exists" });
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const party = await Party.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Party updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePartyById = async (req, res) => {
  try {
    const { id } = req.params;
    await Party.findByIdAndDelete(id);
    res.status(200).json({ message: "Party deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getParties = async (req, res) => {
  try {
    const parties = await Party.find();
    res.status(200).json({ parties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPartyById = async (req, res) => {
  try {
    const { id } = req.params;
    const party = await Party.findById(id);
    res.status(200).json({ party });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
