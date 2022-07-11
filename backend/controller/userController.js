const Project = require('../models/Project');
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

const getProfileById = async (req, res, next) => {
  try {
    const profile = await User.findById(req.params.id);
    res.status(200).json({
      status: true,
      statusCode: 200,
      data: profile,
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

const requestProject = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    telegramUsername,
    fullTimeWorker,
    teamExperience,
    linkedinProfiles,
    websiteUrl,
    country,
    city,
    projectName,
    description,
    projectType,
    projectVision,
    additionalInfo,
  } = req.body;
  const createdBy = req.user.email;
  const linkedinProfileArray = [];
  if (linkedinProfiles) {
    linkedinProfiles.forEach((linkedinProfile) => {
      linkedinProfileArray.push(linkedinProfile.trim());
    });
  }
  const project = new Project({
    firstName,
    lastName,
    email,
    telegramUsername,
    fullTimeWorker,
    teamExperience,
    linkedinProfiles: linkedinProfileArray,
    websiteUrl,
    country,
    city,
    projectName,
    description,
    projectType,
    projectVision,
    additionalInfo,
    user: req.user.id,
    createdBy,
  });
  console.log(project);
  try {
    project.isRequested = true;
    project.isDraft = false;
    await project.save();
    return res.status(200).json({
      message: 'Transaction has been submitted',
      statusCode: 200,
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Object couldnot be formed',
    });
  }
};

const uploadFile = (req, res) => {
  res.json({
    message: 'uploaded',
  });
};

module.exports = {
  getProfiles,
  editProfile,
  getProfileById,
  requestProject,
  uploadFile,
};
