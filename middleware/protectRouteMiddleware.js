/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse').default;

// @desc middleware for admin only access
exports.adminOnlyAccess = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //   console.log(token);
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('dec${decoded}');
    const user = await User.findById(decoded.id);
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

// @desc middleware for superadmin only access
exports.superAdminAccess = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }
    if (user.role !== 'SuperAdmin') {
      console.log('Non superadmin access.');
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

exports.registeredUserAccess = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split('')[1];
  }
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse('No user found ', 404));
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};
