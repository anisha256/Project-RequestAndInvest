const asyncHandler = require('express-async-handler');
const Form = require('../models/Form');

const createForm = asyncHandler(async (req, res) => {
  const { title, email, phone } = req.body;

  const form = new Form({
    title,
    email,
    phone,
  });
  const createdDraft = await form.save();
  console.log(createdDraft.email);
  if (createdDraft) {
    res.status(200).json({
      message: 'form has been submitted',
      statusCode: 200,
      data: createdDraft,
    });
  } else {
    res.status(400).json({ success: false, message: 'Cant submit' });
  }
});

module.exports = {
  createForm,
};
