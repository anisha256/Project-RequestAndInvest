const express = require('express');
const { admin } = require('../middleware/protectRouteMiddleware');
const {
  userList,
  adminList,
  grantProject,
  listAllProjectRequests,
} = require('../controller/adminOnlyController');

const router = express.Router();

router.route('/user/lists').get(admin, userList);
router.route('/lists').get(admin, adminList);
router.route('/project/:id/grant').post(admin, grantProject);
router.route('/project/lists').get(admin, listAllProjectRequests);

module.exports = router;
