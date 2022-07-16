const express = require('express');
const { createForm } = require('../controller/formController');

const router = express.Router();

router.route('/create').post(createForm);

module.exports = router;
