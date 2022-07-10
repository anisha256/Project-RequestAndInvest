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
  listRequestedProjects,
  getProjectById,
} = require('../controller/adminOnlyController');
const {
  deleteAdmin,
  adminRegister,
} = require('../controller/superAdminController');

const router = express.Router();

router.route('/register').post(adminRegister);

router.route('/user/lists').get(admin, userList);
router.route('/lists').get(admin, adminList);

router.route('/project/:id/grant').post(grantProject);
router.route('/project/:id/reject').post(rejectProject);
router.route('/project/:id/get').get(getProjectById);

router.route('/project/lists').get(admin, listAllProjectRequests);
router.route('/project/lists/requested').get(admin, listRequestedProjects);
router.route('/project/lists/rejected').get(admin, listRejectedProjects);
router.route('/project/lists/accepted').get(listAcceptedProjects);
router.route('/:id/delete').delete(admin, deleteAdmin);

module.exports = router;
