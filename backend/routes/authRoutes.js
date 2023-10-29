const express = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../validators/authValidator');

const router = express.Router();

router.post('/signup', authValidator.signup, authController.signup);
router.post('/login', authValidator.login, authController.login);
router.post(
  '/login/email',
  authValidator.requestEmailLogin,
  authController.requestEmailLogin,
);
router.post(
  '/login/google/:token',
  authValidator.googleLogin,
  authController.googleLogin,
);
router.post(
  '/login/facebook/:token',
  authValidator.facebookLogin,
  authController.facebookLogin,
);
router.post(
  '/forgotPassword',
  authValidator.forgotPassword,
  authController.forgotPassword,
);
router.patch(
  '/resetPassword/:token',
  authValidator.resetPassword,
  authController.resetPassword,
);
router.post('/email/exists', authValidator.isExists, authController.isExists);

module.exports = router;
