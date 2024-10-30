const Groups = require("../models/groups");

exports.addGroup = async (req, res) => {
  try {
    const { partyA, partyB, partyC, partyD } = req.body;

    const existingGroup = await Groups.findOne({
      $or: [
        { partyA, partyB },
        { partyA: partyB, partyB: partyA },
        { partyA, partyC },
        { partyA: partyC, partyC: partyA },
        { partyA, partyD },
        { partyA: partyD, partyD: partyA },
        { partyB, partyC },
        { partyB: partyC, partyC: partyB },
        { partyB, partyD },
        { partyB: partyD, partyD: partyB },
        { partyC, partyD },
        { partyC: partyD, partyD: partyC },
      ],
    });

    if (existingGroup) {
      return res.status(400).json({ error: "Group already exists" });
    }

    const group = new Groups({ partyA, partyB, partyC, partyD });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Groups.find()
      .populate("partyA")
      .populate("partyB")
      .populate("partyC")
      .populate("partyD");
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await Groups.findById(req.params.id)
      .populate("partyA")
      .populate("partyB")
      .populate("partyC")
      .populate("partyD");
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGroupById = async (req, res) => {
  try {
    const { partyA, partyB, partyC, partyD } = req.body;

    const existingGroup = await Groups.findOne({
      $or: [
        { partyA, partyB },
        { partyA: partyB, partyB: partyA },
        { partyA, partyC },
        { partyA: partyC, partyC: partyA },
        { partyA, partyD },
        { partyA: partyD, partyD: partyA },
        { partyB, partyC },
        { partyB: partyC, partyC: partyB },
        { partyB, partyD },
        { partyB: partyD, partyD: partyB },
      ],
      _id: { $ne: req.params.id },
    });

    if (existingGroup) {
      return res
        .status(400)
        .json({ error: "Group with these parties already exists" });
    }

    const group = await Groups.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGroupById = async (req, res) => {
  try {
    await Groups.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
