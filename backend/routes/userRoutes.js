const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');
const upload = require('../utils/upload');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/me', userController.getUser);
router.patch('/me/onboard', userValidator.onboard, userController.onboard);

router.use(userController.checkOnboard);

router.patch('/me', userValidator.updateMe, userController.updateMe);
router.delete('/me', userController.deleteMe);

router.post('/me/photo', upload.single('image'), userController.uploadPhoto);
router.delete('/me/photo', userController.deletePhoto);

router.patch(
  '/me/password',
  userValidator.updatePassword,
  userController.updatePassword,
);

router.get('/me/address', userController.getAllAddress);
router.post(
  '/me/address',
  userValidator.createAddress,
  userController.createAddress,
);
router.patch('/me/address', userController.updateAddress);
router.delete('/me/address', userController.deleteAddress);

module.exports = router;
