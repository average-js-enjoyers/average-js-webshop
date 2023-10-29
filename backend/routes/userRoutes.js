const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const upload = require('../utils/upload');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/login/email', authController.requestEmailLogin);
router.post('/login/google/:token', authController.googleLogin);
router.post('/login/facebook/:token', authController.facebookLogin);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/email/exists', authController.isExists);

// Protect all routes after this middleware
router.use(authController.protect);
router.post(
  '/me/onboard',
  [
    // Define validation rules using express-validator
    body('firstName')
      .isAlpha()
      .withMessage('First name must contain only letters'),
    body('lastName')
      .isAlpha()
      .withMessage('Last name must contain only letters'),
    body('phoneNumber')
      .isMobilePhone('any', { strictMode: false })
      .withMessage('Invalid phone number'),
  ],
  userController.onboard,
);
router.use(userController.checkOnboard);
router.get('/me', userController.getUser);
router.patch('/me', userController.updateMe);
router.delete('/me', userController.deleteMe);

router.post('/me/photo', upload.single('image'), userController.uploadPhoto);
router.delete('/me/photo', userController.deletePhoto);

router.patch('/me/password', authController.updatePassword);
router.get('/me/address', userController.getAllAddress);
router.post('/me/address', userController.createAddress);
router.patch('/me/address', userController.updateAddress);
router.delete('/me/address', userController.deleteAddress);

module.exports = router;
