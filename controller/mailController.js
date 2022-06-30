const sgMail = require('@sendgrid/mail');
const Project = require('../models/Project');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailToGranted = async (req, res, next) => {
  try {
    const projects = await Project.find({ isGranted: true });
    const emails = [];
    projects.forEach((project) => {
      emails.push(project.email);
    });
    console.log(emails);
    sgMail.send({
      to: emails,
      from: '',
      subject: 'Project granted ',
      html: ` <h3>Congratulations,</h3>
      <p>Your request For the Project is granted</p>`,
    });
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
  sendMailToGranted,
};
