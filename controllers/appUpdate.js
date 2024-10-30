const AppUpdate = require("../models/appUpdate");

exports.getAppUpdate = async (req, res) => {
  try {
    const appUpdate = await AppUpdate.findOne();
    res.status(200).json(appUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAppUpdate = async (req, res) => {
  try {
    const { newUpdate, version, url } = req.body;
    let isUpdate = false;
    if (newUpdate === "true" || newUpdate === true) {
      isUpdate = true;
    }
    const appUpdate = await AppUpdate.findByIdAndUpdate(
      "66eeca09ad65db7c1553b811",
      {
        isUpdate,
        version,
        url,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "App update updated successfully", appUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
