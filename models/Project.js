const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    firstName: {
      type: String,
      required: [true, 'please enter firstname'],
    },
    lastName: {
      type: String,
      required: [true, 'please enter lastname'],
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
    telegramUsername: {
      type: String,
      required: [true, 'please enter firstname'],
    },
    fullTimeWorker: {
      type: Number,
      required: [true, 'please enter number of full time worker'],
    },
    teamExperience: {
      type: String,
      required: [true, 'please enter teamExp'],
    },
    linkedinProfiles: [{ type: String }],
    websiteUrl: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: [true, 'please enter project name'],
    },
    description: {
      type: String,
      required: [true, 'please enter description'],
    },
    projectType: {
      type: String,
      required: true,
    },
    projectVision: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: String,
      required: true,
    },
    isDraft: {
      type: Boolean,
      required: true,
      default: true,
    },
    isEdited: {
      type: Boolean,
      required: true,
      default: false,
    },
    isRequested: {
      type: Boolean,
      required: true,
      default: false,
    },
    isGranted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isRejected: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
