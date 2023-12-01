const express = require('express');
const authController = require('../../controllers/auth/authController');
const authValidator = require('../../validators/auth/authValidator');

const router = express.Router();

router.post('/signup', authValidator.signup, authController.signup);
router.post('/signin', authValidator.signin, authController.signin);
router.post(
  '/signin/email',
  authValidator.requestEmailSignin,
  authController.requestEmailSignin,
);
router.post(
  '/signin/google',
  authValidator.googleSignin,
  authController.googleSignin,
);
router.post(
  '/signin/facebook',
  authValidator.facebookSignin,
  authController.facebookSignin,
);
router.post(
  '/forgotPassword',
  authValidator.forgotPassword,
  authController.forgotPassword,
);
router.patch(
  '/resetPassword',
  authValidator.resetPassword,
  authController.resetPassword,
);
router.post('/email/exists', authValidator.isExists, authController.isExists);
router.get('/type', authController.protect, authController.getAuthType);

// ADMIN SIGNIN
router.post('/signin/admin', authValidator.signin, authController.signinAdmin);
router.post('/verify-2fa', authController.verify2fa);

module.exports = router;
