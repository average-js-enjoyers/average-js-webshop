const express = require('express');
const userController = require('../../controllers/user/userController');
const profileValidator = require('../../validators/user/profileValidator');
const upload = require('../../services/upload');

const router = express.Router();

router.get('', userController.getUser);
router.patch('/onboard', profileValidator.onboard, userController.onboard);

router.use(userController.checkOnboard);

router.patch('', profileValidator.updateMe, userController.updateMe);
router.delete('', userController.deleteMe);

router.post('/photo', upload.single('image'), userController.uploadPhoto);
router.delete('/photo', userController.deletePhoto);

router.patch(
  '/password',
  profileValidator.updatePassword,
  userController.updatePassword,
);

router.get('/address', userController.getAllAddress);
router.post(
  '/address',
  profileValidator.createAddress,
  userController.createAddress,
);
router.patch('/address', userController.updateAddress);
router.delete('/address', userController.deleteAddress);

module.exports = router;
