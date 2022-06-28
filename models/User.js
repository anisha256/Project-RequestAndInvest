const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// create Schema

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    minlength: 6,
    select: false,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'User',
  },
  isDeactivated: {
    type: Boolean,
    default: false,
  },
});

//password hash //run always before pre run 

UserSchema.pre('save', async function (next){
    //if pw is not changed pass to nxt middleware
    //no hashing 
    if (!this.isModified('password')){
        next();
    }
    //generate salt for hashing pw
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();
})
//comparing password for login
UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

//provide token for sucess auth 
UserSchema.methods.getSignedToken = function () {
    return jwt.sign(
      {
        id: this._id,
      },
      process.env.JWT_SECRET,
      {
        // expiresIn: process.env.JWT_EXPIRE,
        expiresIn: '1d',
      }
    );
  };

module.exports = User = mongoose.model('user',UserSchema)