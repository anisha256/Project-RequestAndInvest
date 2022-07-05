/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const { refreshTokens } = require('../controller/authController');

// @desc middleware for admin only access
const admin = async (req, res, next) => {
  const token = req.header('access_token');
  console.log(token);
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // console.log('dec${decoded}');
    const { _id } = decoded;
    const user = await User.findById(_id);
    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }
    if (user.role !== 'Admin') {
      console.log('Non admin access.');
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// @desc middleware for superAdminOnly only access
const superAdminOnly = async (req, res, next) => {
  const token = req.header('access_token');
  console.log(token);
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const { _id } = decoded;
    const user = await User.findById(_id);
    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }
    if (user.role !== 'SuperAdmin') {
      console.log('Non superAdminOnly access.');
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

const protect = asyncHandler(async (req, res, next) => {
  const token = req.header('access_token');
  console.log(token);
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  // check if access token is expired or not
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(`dec${decoded}`);
    // console.log(decoded);
    // destructure
    const { _id } = decoded;
    // console.log(_id);
    const user = await User.findById(_id);
    // console.log('user', user);
    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }
    req.user = user;
    return next();
  } catch (error) {
    res.status(403);
    return next(error);
  }
});
const refreshTokenReq = async (req, res, next) => {
  try {
    const token = req.header('refresh_token');
    if (!token) {
      return next(new ErrorResponse('refresh_token is required', 400));
    }
    if (!refreshTokens.includes(token)) {
      return next(new ErrorResponse('Token is not valid', 403));
    }
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    refreshTokens.filter((check) => check !== token);
    const { _id } = decoded;
    req.user = await User.findById(_id);
    req.refresh_token = token;
    return next();
  } catch (error) {
    res.status(403);
    return next(error);
  }
};

module.exports = { protect, admin, superAdminOnly, refreshTokenReq };
