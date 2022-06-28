const express = require('express');
const {
  getProfiles,
  editProfile,
  requestProject,
  createProjectDraft,
  editDraft,
  submitDraft,
} = require('../controller/userController');
const { protect } = require('../middleware/protectRouteMiddleware');

const router = express.Router();

router.route('/profiles').get(getProfiles);
router.route('/:id/profile').put(editProfile);

router.route('/project/request').post(requestProject);
router.route('/project/draft').post(createProjectDraft);
router.route('/project/draft/:id/edit').put(editDraft);
router.route('/project/draft/:id/submit').post(submitDraft);

module.exports = router;
