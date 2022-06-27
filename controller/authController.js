const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const crypto = require("crypto");

const superAdminRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  const role = "SuperAdmin";
  try {
    const user = await User.create({
      username,
      email,
      password,
      role,
    });
    getToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};
const userRegister = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
      role,
    });
    getToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }
  console.log("abcde");
  try {
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    console.log("abcde");

    const isMatch = await user.matchPassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    if (user.role == "Admin" || user.role == "User") {
      getToken(user, 200, res);
    } else {
      return next(new ErrorResponse("Not Registered", 400));
    }
    console.log("efgh");
  } catch (error) {
    next(error);
  }
};
const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    user.isDeactivated = true;
    user.status = false;
    console.log(user);
    await user.save();
    res.status(200).json({
      message: "id is deactivated",
    });
  } catch (error) {
    res.status(400).json({
      message: "id not Found",
    });
  }
};

const getToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  return res.status(statusCode).json({
    success: true,
    token,
    role: user.role,
    email: user.email,
  });
};

module.exports = { superAdminRegister, userRegister, login, deactivateUser };
