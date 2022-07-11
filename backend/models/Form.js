const mongoose = require('mongoose');

// create Schema
const formSchema = new mongoose.Schema(
  {
    title: {
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
    phone: {
      type: String,
      default: 'Form',
    },
  },
  {
    timeStamps: true,
  }
);

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
