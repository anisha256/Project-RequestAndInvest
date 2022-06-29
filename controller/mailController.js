// const nodemailer = require('nodemailer');
const Project = require('../models/Project');

const sendMail = async (req, res, next) => {
  try {
    const projects = await Project.find({ isGranted: true });
    const emails = [];
    projects.forEach((project) => {
      emails.push(project.email);
    });
    console.log(emails);
    // respomsible for sending mail
    // const mailTransporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: '1aanisha.rai@gmail.com',
    //     pass: '',
    //   },
    // });
    // const details = {
    //   from: '1aanisha.rai@gmail.com',
    //   to: 'appyrai6@gmail.com',
    //   subject: 'Request Granted',
    //   text: 'Congratulations.Your request for the project has been granted.',
    // };
    // mailTransporter.sendMail(details, (err) => {
    //   if (err) {
    //     console.log('it has an error', err);
    //   } else {
    //     console.log('email has sent');
    //   }
    // });
    res.status(200).json({
      status: true,
      statusCode: 200,
      // data: 'Email is sent successfully',
      data: emails,
    });
  } catch (error) {
    res.status(404).json({
      data: 'not found',
    });
  }

  next();
};

module.exports = {
  sendMail,
};
