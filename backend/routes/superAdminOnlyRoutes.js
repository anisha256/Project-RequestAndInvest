const express = require('express');

const router = express.Router();
const { superAdminOnly } = require('../middleware/protectRouteMiddleware');

const {
  adminRegister,
  deleteAdmin,
} = require('../controller/superAdminController');

router.route('/admin/register').post(superAdminOnly, adminRegister);

router.route('/delete/admin/:id').delete(superAdminOnly, deleteAdmin);
module.exports = router;
