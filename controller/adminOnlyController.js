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

module.exports = { userList, adminList };
