const District = require("../models/district");

exports.addDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const district = new District({ name });
    await district.save();
    res.status(201).json(district);
  } catch (error) {
    if (error.code === 11000) {
      res.json({ message: "District name must be unique" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.getDistricts = async (req, res) => {
  try {
    const districts = await District.find();
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDistrictById = async (req, res) => {
  try {
    const district = await District.findById(req.params.id);
    res.status(200).json(district);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDistrictById = async (req, res) => {
  try {
    const { name } = req.body;
    const district = await District.findByIdAndUpdate(req.params.id, { name });
    res.status(200).json(district);
  } catch (error) {
    if (error.code === 11000) {
      res.json({ message: "District name must be unique" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.deleteDistrictById = async (req, res) => {
  try {
    await District.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "District deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
