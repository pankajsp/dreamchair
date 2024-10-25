const ExitPoll = require("../models/exitPoll");
const upload = require("../multerConfig.js");

exports.addExitPoll = async (req, res) => {
  try {
    const { name, sortName } = req.body;
    const existingExitPoll = await ExitPoll.findOne({ name });
    if (existingExitPoll) {
      return res.json({
        message: "Exit Poll with the same name already exists",
      });
    }
    const image = req.file.path;
    const exitPoll = new ExitPoll({ name, sortName, image });
    await exitPoll.save();
    res.status(200).json({ message: "Exit Poll added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExitPollById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sortName } = req.body;
    const updateData = { name, sortName };

    const existingExitPoll = await ExitPoll.findOne({ name });
    if (existingExitPoll && existingExitPoll._id.toString() !== id) {
      return res.json({
        message: "Exit Poll with the same name already exists",
      });
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const exitPoll = await ExitPoll.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Exit Poll updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExitPollById = async (req, res) => {
  try {
    const { id } = req.params;
    await ExitPoll.findByIdAndDelete(id);
    res.status(200).json({ message: "Exit Poll deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExitPolls = async (req, res) => {
  try {
    const exitPolls = await ExitPoll.find();
    res.status(200).json(exitPolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExitPollById = async (req, res) => {
  try {
    const { id } = req.params;
    const exitPoll = await ExitPoll.findById(id);
    res.status(200).json(exitPoll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
