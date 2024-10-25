const Cabinet = require("../models/cabinet");
const upload = require("../multerConfig.js");

exports.addCabinet = async (req, res) => {
  try {
    const { name, sortName } = req.body;
    const existingCabinet = await Cabinet.findOne({ name });
    if (existingCabinet) {
      return res.json({ message: "Cabinet with the same name already exists" });
    }
    const image = req.file.path;
    const cabinet = new Cabinet({ name, sortName, image });
    await cabinet.save();
    res.status(200).json({ message: "Cabinet added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCabinetById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sortName } = req.body;
    const updateData = { name, sortName };

    const existingCabinet = await Cabinet.findOne({ name });
    if (existingCabinet && existingCabinet._id.toString() !== id) {
      return res.json({ message: "Cabinet with the same name already exists" });
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const cabinet = await Cabinet.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Cabinet updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCabinetById = async (req, res) => {
  try {
    const { id } = req.params;
    await Cabinet.findByIdAndDelete(id);
    res.status(200).json({ message: "Cabinet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCabinets = async (req, res) => {
  try {
    const cabinets = await Cabinet.find();
    res.status(200).json(cabinets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCabinetById = async (req, res) => {
  try {
    const { id } = req.params;
    const cabinet = await Cabinet.findById(id);
    res.status(200).json(cabinet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
