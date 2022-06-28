const express = require('express');
const { admin } = require('../middleware/protectRouteMiddleware');
const { userList, adminList } = require('../controller/adminOnlyController');

const router = express.Router();

router.route('/user/lists').get(admin, userList);
router.route('/lists').get(admin, adminList);

module.exports = router;
