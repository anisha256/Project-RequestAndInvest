const User = require('../models/User');

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await User.find();
    res.status(200).json({
      status: true,
      statusCode: 200,
      data: profiles,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
  next();
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
    res.status(200).json({
      status: true,
      statusCode: 200,
      data: updatedProfile,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Profile not found',
    });
  }
  next();
};

module.exports = { getProfiles, editProfile };
