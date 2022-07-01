const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// create Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please provide a username'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please Provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      default: 'User',
    },
    emailToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);
// define schema level methods to create access token and refresh token

// comparing password for login
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
// password hash //run always before pre run

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  // generate salt for hashing pw

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// userSchema.methods.getAuthToken = function () {
//   return jwt.sign(
//     {
//       id: this.id,
//     },
//     process.env.JWT_SECRET,
//     {
//       // expiresIn: process.env.JWT_EXPIRE,
//       expiresIn: '1d',
//     }
//   );
// };

userSchema.methods.getAuthToken = function () {
  const user = this;
  const accessToken = jwt.sign(
    { _id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '2d' }
  );
  const refreshToken = jwt.sign(
    { _id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );
  return { accessToken, refreshToken };
};
userSchema.methods.refreshAuthToken = function () {
  console.log('hughmiuhmjh');
  const user = this;
  console.log(user);
  const accessToken = jwt.sign(
    { _id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  console.log(accessToken);
  return { accessToken };
};
const User = mongoose.model('User', userSchema);
module.exports = User;
