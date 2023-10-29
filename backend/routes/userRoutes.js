const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');
const upload = require('../utils/upload');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/me/onboard', userValidator.onboard, userController.onboard);

router.use(userController.checkOnboard);

router.get('/me', userController.getUser);
router.patch('/me', userController.updateMe);
router.delete('/me', userController.deleteMe);

router.post('/me/photo', upload.single('image'), userController.uploadPhoto);
router.delete('/me/photo', userController.deletePhoto);

router.patch('/me/password', userController.updatePassword);

router.get('/me/address', userController.getAllAddress);
router.post('/me/address', userController.createAddress);
router.patch('/me/address', userController.updateAddress);
router.delete('/me/address', userController.deleteAddress);

module.exports = router;
