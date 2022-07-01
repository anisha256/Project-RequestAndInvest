const express = require('express');
const {
  getProfiles,
  editProfile,
  getProfileById,
  requestProject,
} = require('../controller/userController');
const {
  createProjectDraft,
  editDraft,
  submitDraft,
  deleteDraft,
  getDraftsOfUser,
  listsOfDraftsSubmittedByUser,
} = require('../controller/draftController');
const { protect } = require('../middleware/protectRouteMiddleware');

const router = express.Router();

router.route('/profiles').get(getProfiles);
router.route('/profile/:id').get(protect, getProfileById);
router.route('/:id/profile').put(protect, editProfile);

router.route('/project/request').post(protect, requestProject);
router.route('/project/draft').post(protect, createProjectDraft);

router.route('/project/drafts/:userid').get(protect, getDraftsOfUser);
router.route('/project/draft/delete/:id').delete(protect, deleteDraft);
router
  .route('/project/drafts/:userid/submitted/lists')
  .get(protect, listsOfDraftsSubmittedByUser);

router
  .route('/project/draft/:id')
  .put(protect, editDraft)
  .post(protect, submitDraft);
// .delete(protect, deleteDraft);

module.exports = router;
