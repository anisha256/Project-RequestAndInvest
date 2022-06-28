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
  try {
    const project = await Project.findById(req.params.id);
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
};
const listAllProjectRequests = async (req, res) => {
  const project = await Project.find({ isRequested: true });
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: project,
  });    
};

module.exports = { userList, adminList, grantProject, listAllProjectRequests };
