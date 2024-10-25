const Constituency = require("../models/constituency");

exports.addConstituency = async (req, res) => {
  try {
    const { name, district } = req.body;
    const constituency = new Constituency({ name, district });
    await constituency.save();
    res.status(201).json(constituency);
  } catch (error) {
    if (error.code === 11000) {
      res.json({ message: "Constituency name must be unique" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.getConstituencies = async (req, res) => {
  try {
    const constituencies = await Constituency.find().populate("district");
    res.status(200).json(constituencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getConstituencyById = async (req, res) => {
  try {
    const constituency = await Constituency.findById(req.params.id).populate(
      "district"
    );
    res.status(200).json(constituency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateConstituencyById = async (req, res) => {
  try {
    const { name, district } = req.body;
    const constituency = await Constituency.findByIdAndUpdate(
      req.params.id,
      { name, district },
      { new: true }
    );
    res.status(200).json(constituency);
  } catch (error) {
    if (error.code === 11000) {
      res.json({ message: "Constituency name must be unique" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.deleteConstituencyById = async (req, res) => {
  try {
    await Constituency.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Constituency deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getConstituenciesByDistrictId = async (req, res) => {
  try {
    const constituencies = await Constituency.find({ district: req.params.id });
    res.status(200).json(constituencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
