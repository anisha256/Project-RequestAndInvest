const Project = require('../models/Project');
const User = require('../models/User');

const grantProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (
    project.isRequested === true &&
    project.isGranted === false &&
    project.isRejected === false
  ) {
    try {
      project.isGranted = true;
      await project.save();
      res.status(200).json({
        success: true,
        statusCode: 200,
        data: 'Request for Project is granted',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        data: 'Project id not found',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      statusCode: 400,
      data: 'Project is only saved as draft ',
    });
  }
};

const rejectProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project.isGranted === false) {
    try {
      project.isRejected = true;
      await project.save();
      res.status(200).json({
        success: true,
        statusCode: 200,
        data: 'Request for Project is rejected',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        data: 'Project id not found',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      data: 'Project is already granted',
    });
  }
};

const listAllProjectRequests = async (req, res) => {
  try {
    const project = await Project.find({ isRequested: true });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      data: error,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      data: error,
    });
  }
};

const listRequestedProjects = async (req, res) => {
  try {
    const project = await Project.find({
      $and: [
        { isRequested: true },
        { isRejected: false },
        { isGranted: false },
      ],
    });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      data: error,
    });
  }
};

const listAcceptedProjects = async (req, res) => {
  try {
    const project = await Project.find({ isGranted: true });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      data: error,
    });
  }
};

const listRejectedProjects = async (req, res) => {
  try {
    const project = await Project.find({ isRejected: true });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      data: error,
    });
  }
};

const userList = async (req, res) => {
  try {
    const user = await User.find({ role: 'User' });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      data: error,
    });
  }
};

const adminList = async (req, res) => {
  try {
    const user = await User.find({ role: 'Admin' });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      data: error,
    });
  }
};

module.exports = {
  userList,
  adminList,
  grantProject,
  rejectProject,
  listAllProjectRequests,
  listRejectedProjects,
  listAcceptedProjects,
  listRequestedProjects,
  getProjectById,
};
