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

// Draft
const createProjectDraft = async (req, res, next) => {
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
  const linkedinProfileArray = [];
  if (linkedinProfiles) {
    linkedinProfiles.split(',').forEach((linkedinProfile) => {
      linkedinProfileArray.push(linkedinProfile.trim());
    });
  }
  try {
    const draft = await Project.create({
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
    });

    return res.status(200).json({
      message: 'Draft has been created',
      statusCode: 200,
      data: draft,
    });
  } catch (error) {
    return next(error);
  }
};
const editDraft = async (req, res, next) => {
  const updatedDraft = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (updatedDraft.isDraft === true && updatedDraft.isRequested === false) {
    try {
      updatedDraft.isEdited = true;
      await updatedDraft.save();
      res.status(200).json({
        status: true,
        statusCode: 200,
        data: updatedDraft,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        data: 'Draft not found',
      });
    }
  } else {
    res.status(404).json({
      status: false,
      data: 'given id is not draft anymore',
    });
  }

  next();
};
const submitDraft = async (req, res, next) => {
  const submitedDraft = await Project.findById(req.params.id);
  if (submitedDraft.isEdited === true && submitedDraft.isDraft === true) {
    try {
      submitedDraft.isRequested = true;
      submitedDraft.isDraft = false;
      await submitedDraft.save();
      res.status(200).json({
        status: true,
        statusCode: 200,
        data: submitedDraft,
      });
    } catch (error) {
      res.status(404).json({
        data: 'not found',
      });
    }
  } else {
    res.status(404).json({
      status: false,
      data: 'Already submitted',
    });
  }

  next();
};
const requestProject = async (req, res, next) => {
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
  const linkedinProfileArray = [];
  if (linkedinProfiles) {
    linkedinProfiles.split(',').forEach((linkedinProfile) => {
      linkedinProfileArray.push(linkedinProfile.trim());
    });
  }
  try {
    const project = await Project.create({
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
      // isRequested: true,
    });
    project.isRequested = true;
    project.isDraft = false;
    await project.save();
    res.status(200).json({
      message: 'Transaction has been submitted',
      statusCode: 200,
      data: project,
    });
    if (project) {
      res.status(400).json({
        status: false,
        data: 'Transaction has already been submitted',
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfiles,
  editProfile,
  requestProject,
  createProjectDraft,
  editDraft,
  submitDraft,
};
