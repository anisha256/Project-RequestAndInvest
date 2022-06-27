const express = require("express");
const { adminOnlyAccess } = require("../middleware/protectRouteMiddleware");
const { userList, adminList } = require("../controller/adminOnlyController");

const router = express.Router();

router.route("/user/lists").get(adminOnlyAccess, userList);
router.route("/admin/lists").get(adminOnlyAccess, adminList);

module.exports = router;
