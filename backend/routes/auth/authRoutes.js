const express = require('express');
const authController = require('../../controllers/auth/authController');
const authValidator = require('../../validators/auth/authValidator');

const router = express.Router();

router.post('/user/signup', authValidator.signup, authController.signup);
router.post('/user/signin', authValidator.signin, authController.signin);
router.post(
  '/user/signin/email',
  authValidator.requestEmailSignin,
  authController.requestEmailSignin,
);
router.post(
  '/user/signin/google',
  authValidator.googleSignin,
  authController.googleSignin,
);
router.post(
  '/user/signin/facebook',
  authValidator.facebookSignin,
  authController.facebookSignin,
);
router.post(
  '/user/password/forgot',
  authValidator.forgotPassword,
  authController.forgotPassword,
);
router.patch(
  '/user/password/reset',
  authValidator.resetPassword,
  authController.resetPassword,
);
router.post(
  '/user/info/email',
  authValidator.isExists,
  authController.isExists,
);
router.get(
  '/user/info/type',
  authController.protect,
  authController.getAuthType,
);

// ADMIN SIGNIN
router.post('/admin/signin', authValidator.signin, authController.signinAdmin);
router.post('/admin/verify-2fa', authController.verify2fa);

module.exports = router;
