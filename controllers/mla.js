const MLA = require("../models/mla");

exports.addMLA = async (req, res) => {
  try {
    const { name, partyId, constituencyId, districtId } = req.body;
    const image = req.file.path;
    const mla = new MLA({ name, partyId, constituencyId, districtId, image });
    await mla.save();
    res.status(201).json(mla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addBulkMLA = async (req, res) => {
  try {
    const { name, partyId, constituencyId, districtId } = req.body;
    const nameArray = name.split(",").map((n) => n.trim());
    const image = req.file.path;
    const mlas = await MLA.insertMany(
      nameArray.map((n) => ({
        name: n,
        partyId,
        constituencyId,
        districtId,
        image,
      }))
    );
    res.status(201).json({
      success: true,
      message: "MLAs added successfully",
      data: mlas,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMLAs = async (req, res) => {
  try {
    const mlas = await MLA.find()
      .populate("partyId")
      .populate("constituencyId")
      .populate("districtId");
    res.status(200).json(mlas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMLAById = async (req, res) => {
  try {
    const mla = await MLA.findById(req.params.id)
      .populate("partyId")
      .populate("constituencyId")
      .populate("districtId");
    res.status(200).json(mla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMLAById = async (req, res) => {
  try {
    const { name, partyId, constituencyId, districtId } = req.body;
    const updateData = { name, partyId, constituencyId, districtId };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const mla = await MLA.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.status(200).json(mla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMLAById = async (req, res) => {
  try {
    await MLA.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "MLA deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
