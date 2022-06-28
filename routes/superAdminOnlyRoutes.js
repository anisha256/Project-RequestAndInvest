const express = require('express');

const router = express.Router();
const { superAdmin } = require('../middleware/protectRouteMiddleware');

const {
  adminRegister,
  deleteAdmin,
} = require('../controller/superAdminController');

router.route('/admin/register').post(superAdmin, adminRegister);

router.route('/delete/admin/:id').delete(superAdmin, deleteAdmin);
module.exports = router;
