const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

const getToken = (user) => {
  const token = user.getSignedToken();
  return { token };
};

const superAdminRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  const role = 'SuperAdmin';
  try {
    const user = await User.create({
      username,
      email,
      password,
      role,
    });
    const token = getToken(user);
    res.status(200).json({
      message: 'superadmin registered successfully',
      statusCode: 200,
      data: token,
    });
    return next();
  } catch (error) {
    return next(error);
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
    const token = getToken(user);
    console.log(token);
    res.status(200).json({
      message: 'user registered successfully',
      statusCode: 200,
      data: [{ email: user.email, role: user.role }],
    });
    return next();
  } catch (error) {
    return next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }
    const isMatch = await user.matchPassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }
    if (user.role === 'Admin' || user.role === 'User') {
      const token = getToken(user);
      res.status(200).json({
        message: 'login successfully',
        statusCode: 200,
        data: [{ email: user.email, role: user.role, token }],
      });
    } else {
      return next(new ErrorResponse(`Not Registered`, 400));
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isDeactivated = true;
    console.log(user);
    await user.save();
    res.status(200).json({
      message: 'id is deactivated',
      statusCode: 200,
    });
  } catch (error) {
    res.status(400).json({
      message: 'id not Found',
      statusCode: 400,
    });
  }
};

module.exports = { superAdminRegister, userRegister, login, deactivateUser };
