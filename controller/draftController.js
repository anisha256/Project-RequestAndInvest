const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// Draft
const createProjectDraft = asyncHandler(async (req, res) => {
  // console.log(req.user);
  // console.log(req.body);
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
    linkedinProfiles.split(',').forEach((linkedinProfile) => {
      linkedinProfileArray.push(linkedinProfile.trim());
    });
  }
  const draft = new Project({
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
  const createdDraft = await draft.save();
  console.log(createdDraft.email);
  if (createdDraft) {
    res.status(200).json({
      message: 'Draft has been created',
      statusCode: 200,
      data: createdDraft,
    });
  } else {
    res.status(201).json({ success: false, ...req.body });
  }
});

const getDraftsOfUser = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  const savedDrafts = [];
  projects.forEach((project) => {
    if (project.isDraft === true) {
      savedDrafts.push(project);
    }
  });
  console.log(savedDrafts);
  if (savedDrafts) {
    res.status(200).json({
      message: `User Saved Drafts`,
      statusCode: 200,
      data: savedDrafts,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'User doesnot have drafts',
    });
  }
});

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

const listsOfDraftsSubmittedByUser = asyncHandler(async (req, res) => {
  const drafts = await Project.find({ user: req.user.id });
  const submittedDrafts = [];
  drafts.forEach((draft) => {
    if (draft.isRequested === true) {
      submittedDrafts.push(draft);
    }
  });
  console.log(submittedDrafts);
  if (submittedDrafts) {
    res.status(200).json({
      message: `Submitted DraftList `,
      statusCode: 200,
      data: submittedDrafts,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'User doesnot have drafts',
    });
  }
});

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
const deleteDraft = asyncHandler(async (req, res) => {
  const draft = await Project.findById(req.params.id);
  if (draft) {
    console.log('afsjbagkndl');
    await draft.remove();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: 'draft deleted successfully',
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Draft not found',
    });
  }
});

module.exports = {
  createProjectDraft,
  editDraft,
  submitDraft,
  deleteDraft,
  getDraftsOfUser,
  listsOfDraftsSubmittedByUser,
};
