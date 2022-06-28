const express = require('express');
const {
  getProfiles,
  editProfile,
  requestProject,
} = require('../controller/userController');
const { protect } = require('../middleware/protectRouteMiddleware');

const router = express.Router();

router.route('/profiles').get(getProfiles);
router.route('/:id/profile').put(editProfile);

router.route('/project/request').post(requestProject);

module.exports = router;
