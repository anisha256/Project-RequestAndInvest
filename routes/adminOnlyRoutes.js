const express = require('express');
const { admin } = require('../middleware/protectRouteMiddleware');
const {
  userList,
  adminList,
  grantProject,
  rejectProject,
  listAllProjectRequests,
  listRejectedProjects,
  listAcceptedProjects,
} = require('../controller/adminOnlyController');

const router = express.Router();

router.route('/user/lists').get(admin, userList);
router.route('/lists').get(admin, adminList);
router.route('/project/:id/grant').post(admin, grantProject);
router.route('/project/:id/reject').post(admin, rejectProject);

router.route('/project/lists').get(admin, listAllProjectRequests);
router.route('/project/lists/rejected').get(admin, listRejectedProjects);
router.route('/project/lists/accepted').get(admin, listAcceptedProjects);

module.exports = router;
