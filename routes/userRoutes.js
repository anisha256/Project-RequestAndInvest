const express = require('express');
const { getProfiles, editProfile } = require('../controller/userController');

const router = express.Router();

router.route('/profiles').get(getProfiles);
router.route('/:id/profile').put(editProfile);

module.exports = router;
