const CabinetMember = require("../models/cabinetMembers");

exports.addCabinetMember = async (req, res) => {
  try {
    const { name, partyId, cabinetId } = req.body;
    const image = req.file.path;
    const cabinetMember = new CabinetMember({
      name,
      partyId,
      cabinetId,
      image,
    });
    await cabinetMember.save();
    res.status(201).json(cabinetMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addBulkCabinetMember = async (req, res) => {
  try {
    const { name, partyId, cabinetId } = req.body;
    const nameArray = name.split(",").map((n) => n.trim());
    const image = req.file.path;
    const cabinetMembers = await CabinetMember.insertMany(
      nameArray.map((n) => ({ name: n, partyId, cabinetId, image }))
    );
    res.status(201).json(cabinetMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCabinetMembers = async (req, res) => {
  try {
    const cabinetMembers = await CabinetMember.find()
      .populate("partyId")
      .populate("cabinetId");
    res.status(200).json(cabinetMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCabinetMemberById = async (req, res) => {
  try {
    const cabinetMember = await CabinetMember.findById(req.params.id)
      .populate("partyId")
      .populate("cabinetId");
    res.status(200).json(cabinetMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateCabinetMemberById = async (req, res) => {
  try {
    const { name, partyId, cabinetId } = req.body;
    const updateData = { name, partyId, cabinetId };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const cabinetMember = await CabinetMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );
    res.status(200).json(cabinetMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCabinetMemberById = async (req, res) => {
  try {
    await CabinetMember.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cabinet Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCabinetMemberByCabinetId = async (req, res) => {
  try {
    const cabinetMembers = await CabinetMember.find({
      cabinetId: req.params.cabinetId,
    }).populate("partyId");
    res.status(200).json(cabinetMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
