const express = require('express');

const router = express.Router();

const {
  userRegister,
  login,
  superAdminRegister,
  deactivateUser,
  sendMail,
} = require('../controller/authController');

router.route('/auth/user/register').post(userRegister);
router.route('/auth/superAdminregister').post(superAdminRegister);
router.route('/deactivate/:id').post(deactivateUser);

router.route('/login').get((req, res) => {
  res.status(200).json({
    message: true,
  });
});
router.route('/login').post(login);
router.route('/send/mail').post(sendMail);

module.exports = router;
