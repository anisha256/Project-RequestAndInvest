const express = require("express");
const router = express.Router();
const { superAdminAccess } = require("../middleware/protectRouteMiddleware");

const { adminRegister,deleteAdmin } = require("../controller/superAdminController");

router.route("/admin/register").post(superAdminAccess, adminRegister);

router.route("/delete/admin/:id").delete(superAdminAccess, deleteAdmin);

module.exports = router;
