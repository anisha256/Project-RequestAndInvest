const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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
    const token = user.getAuthToken();
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
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      role: 'User',
      emailToken: crypto.randomBytes(64).toString('hex'),
    });
    const token = user.getAuthToken();
    console.log(token);

    res.status(200).json({
      message: 'user registered successfully',
      statusCode: 200,
      data: [{ email: user.email, role: user.role }],
    });
    const msg = {
      to: user.email,
      from: '1aanisha.rai@gmail.com',
      subject: 'Verify your Email ',
      html: ` <h2>
      Let's verify your email address so you can start using this website.</h2>
      <p>Hello,Thanks for registering on our site</p>
      <p>Please click the link below to verify ur account</p>
      <a href="http://${req.headers.host}/api/verify-email?token=${user.emailToken}">Verify your account</a>
      `,
    };
    await sgMail.send(msg);
    return next();
  } catch (error) {
    return next(error);
  }
};
// We need to send an email to the user to verify the email after registration
const verifyEmail = async (req, res, next) => {
  console.log(req.headers.host);
  console.log(req.query);
  const user = await User.findOne({ emailToken: req.query.token });
  console.log(user);

  if (!user) {
    return next(new ErrorResponse('Token is invalid', 400));
  }
  user.emailToken = null;
  user.isVerified = true;
  await user.save();
  return res.status(200).json({
    success: true,
    message: 'email verified successfully',
  });
};
const refreshTokens = [];

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
    if (
      user.role === 'Admin' ||
      user.role === 'User' ||
      user.role === 'SuperAdmin'
    ) {
      const token = user.getAuthToken();
      const { accessToken, refreshToken } = token;
      refreshTokens.push(refreshToken);
      res.status(200).json({
        message: 'login successfully',
        statusCode: 200,
        data: {
          userid: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          isDeactivated: user.isDeactivated,
          accessToken,
          refreshToken,
        },
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
const refresh = async (req, res) => {
  const { user } = req;
  console.log(user);
  const token = await user.refreshAuthToken();
  console.log('new access token', token);
  res.json({
    status: 'success',
    message: 'Token refresh successfully',
    data: {
      accessToken: token.accessToken,
      // refresh_token: req.header('refresh_token'),
    },
  });
};
const logout = (req, res) => {
  const refreshToken = req.refresh_token;
  refreshTokens.filter((token) => token !== refreshToken);
  res.json({
    status: 'success',
    message: 'User logout successfully',
  });
};

module.exports = {
  superAdminRegister,
  userRegister,
  verifyEmail,
  login,
  deactivateUser,
  refresh,
  refreshTokens,
  logout,
};
