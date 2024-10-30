const Contest = require("../models/Contest");
const MLA = require("../models/mla");
const Group = require("../models/groups");
const District = require("../models/district");
const Constituency = require("../models/constituency");

exports.addContest = async (req, res) => {
  try {
    const {
      group,
      district,
      constituency,
      spots,
      entryFee,
      winingAmount,
      upTo,
      teamsWin,
    } = req.body;

    const contest = new Contest({
      group,
      district,
      constituency,
      spots,
      entryFee,
      winingAmount,
      upTo,
      teamsWin,
      prizePool: entryFee * spots,
    });
    await contest.save();
    res.status(201).json(contest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addBulkContest = async (req, res) => {
  const { spots, entryFee, winingAmount, upTo, teamsWin } = req.body;

  try {
    const districts = await District.find();
    const constituencies = await Constituency.find();
    const groups = await Group.find();

    const contests = []; // Initialize an array to hold contest objects

    groups.forEach((group) => {
      districts.forEach((district) => {
        constituencies.forEach((constituency) => {
          // Loop through the arrays and create contest objects
          for (let i = 0; i < spots.length; i++) {
            contests.push({
              group,
              district,
              constituency,
              spots: spots[i],
              entryFee: entryFee[i],
              winingAmount: winingAmount[i],
              upTo: upTo[i], // Use the current index for upTo
              teamsWin: teamsWin[i], // Use the current index for teamsWin
              prizePool: entryFee[i] * spots[i], // Calculate prizePool
            });
          }
        });
      });
    });
    console.log("contests", contests);
    const insertedContests = await Contest.insertMany(contests); // Insert the array of contests
    res.status(201).json("success");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.addBulkContest = async (req, res) => {
//   try {
//     const contests = await Contest.insertMany(req.body);
//     res.status(201).json(contests);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getContests = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Get page and limit from query parameters
  const skip = (page - 1) * limit; // Calculate how many documents to skip

  try {
    const contests = await Contest.find()
      .populate([
        {
          path: "group",
          populate: [
            { path: "partyA" },
            { path: "partyB" },
            { path: "partyC" },
            { path: "partyD" },
          ],
        },
        { path: "district" },
        { path: "constituency" },
      ])
      .skip(skip) // Skip the calculated number of documents
      .limit(parseInt(limit)); // Limit the number of documents returned

    const totalContests = await Contest.countDocuments(); // Get total number of contests
    res.status(200).json({
      totalContests,
      totalPages: Math.ceil(totalContests / limit), // Calculate total pages
      currentPage: page,
      contests,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate("group")
      .populate("district")
      .populate("constituency");
    res.status(200).json(contest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContestById = async (req, res) => {
  const {
    group,
    district,
    constituency,
    spots,
    entryFee,
    winingAmount,
    upTo,
    teamsWin,
  } = req.body;
  try {
    const contest = await Contest.findByIdAndUpdate(
      req.params.id,
      {
        group,
        district,
        constituency,
        spots,
        entryFee,
        winingAmount,
        upTo,
        teamsWin,
        prizePool: entryFee * spots,
      },
      { new: true }
    );
    res.status(200).json(contest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContestById = async (req, res) => {
  try {
    await Contest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fillContestById = async (req, res) => {
  const { spots } = req.body;
  try {
    const contest = await Contest.findById(req.params.id);
    if (contest.spotsFilled + spots > contest.spots) {
      return res.status(400).json({ error: "Contest is full" });
    } else {
      contest.spotsFilled += spots;
      await contest.save();
      res.status(200).json(contest);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContestByPartyDistrictConstituency = async (req, res) => {
  try {
    const contests = await Contest.find({
      group: req.params.group,
      district: req.params.district,
      constituency: req.params.constituency,
    })
      .populate("group")
      .populate("district")
      .populate("constituency");
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContestMLA = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId)
      .populate({
        path: "group",
        populate: [
          { path: "partyA" },
          { path: "partyB" },
          { path: "partyC" },
          { path: "partyD" },
        ],
      })
      .populate("district")
      .populate("constituency");

    const partyAMlas = await MLA.find({
      partyId: contest.group.partyA._id,
      districtId: contest.district._id,
      constituencyId: contest.constituency._id,
    });

    const partyBMlas = await MLA.find({
      partyId: contest.group.partyB._id,
      districtId: contest.district._id,
      constituencyId: contest.constituency._id,
    });

    const partyCMlas = await MLA.find({
      partyId: contest.group.partyC._id,
      districtId: contest.district._id,
      constituencyId: contest.constituency._id,
    });

    const partyDMlas = await MLA.find({
      partyId: contest.group.partyD._id,
      districtId: contest.district._id,
      constituencyId: contest.constituency._id,
    });

    res.status(200).json({
      message: "success",
      contest,
      partyAMlas,
      partyBMlas,
      partyCMlas,
      partyDMlas,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
