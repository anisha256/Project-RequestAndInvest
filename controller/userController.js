const User = require("../models/User");

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await User.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const editProfile = async (req, res, next) => {
  try {
    const updatedProfile = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(404).json({
      message: "Profile not found",
    });
  }
};

module.exports = { getProfiles, editProfile };
