const Project = require('../models/Project');
const User = require('../models/User');

const userList = async (req, res) => {
  const user = await User.find({ role: 'User' });
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: user,
  });
};
const adminList = async (req, res) => {
  const user = await User.find({ role: 'Admin' });
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: user,
  });
};
const grantProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project.isRequested === true && project.isDraft === false) {
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
  const project = await Project.find({ isRequested: true });
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: project,
  });
};
const listAcceptedProjects = async (req, res) => {
  const project = await Project.find({ isGranted: true });
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: project,
  });
};
const listRejectedProjects = async (req, res) => {
  const project = await Project.find({ isRejected: true });
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: project,
  });
};

module.exports = {
  userList,
  adminList,
  grantProject,
  rejectProject,
  listAllProjectRequests,
  listRejectedProjects,
  listAcceptedProjects,
  // sendEmail,
};
