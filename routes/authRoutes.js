const express = require('express');

const router = express.Router();

const {
  userRegister,
  login,
  superAdminRegister,
  deactivateUser,
  refresh,
  verifyEmail,
  logout,
} = require('../controller/authController');
const { sendMailToGranted } = require('../controller/mailController');
const {
  protect,
  refreshTokenReq,
} = require('../middleware/protectRouteMiddleware');

router.route('/auth/user/register').post(userRegister);
router.route('/auth/superAdminregister').post(superAdminRegister);
router.route('/deactivate/:id').post(protect, deactivateUser);
router.route('/verify-email').get(verifyEmail);

router.route('/login').get((req, res) => {
  res.status(200).json({
    message: true,
  });
});
router.route('/login').post(login);
router.route('/logout').delete(refreshTokenReq, logout);

router.route('/refresh').get(refreshTokenReq, refresh);

router.route('/send/mail').post(sendMailToGranted);

module.exports = router;
