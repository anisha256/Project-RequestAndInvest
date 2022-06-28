const User = require("../models/User");

const userList = async (req, res, next) => {
  const data = await User.find({ role: "User" });
  console.log(data);
  res.status(200).json({
    success: true,
    statusCode:200,
    data: data,
  });
  console.log(data);
};
const adminList = async (req, res, next) => {
  const data = await User.find({ role: "Admin" });
  console.log(data);
  res.status(200).json({
    success: true,
    statusCode:200,
    data: data,
  });
  console.log(data);
};

module.exports = { userList,adminList };
