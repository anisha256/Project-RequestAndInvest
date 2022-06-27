const express = require("express");
const router = express.Router();

const {
  userRegister,
  login,
  superAdminRegister,
  deactivateUser,
} = require("../controller/authController");

router.route("/auth/user/register").post(userRegister);
router.route("/superAdminregister").post(superAdminRegister);
router.route("/deactivate/:id").post(deactivateUser);

router.route("/login").get((req, res, next) => {
  res.status(200).json({
    message: true,
  });
});
router.route("/login").post(login);

module.exports = router;
