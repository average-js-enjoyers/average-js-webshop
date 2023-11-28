const express = require('express');
const userController = require('../../controllers/user/userController');
const userValidator = require('../../validators/userValidator');
const upload = require('../../utils/upload');

const router = express.Router();

router.get('', userController.getUser);
router.patch('/onboard', userValidator.onboard, userController.onboard);

router.use(userController.checkOnboard);

router.patch('', userValidator.updateMe, userController.updateMe);
router.delete('', userController.deleteMe);

router.post('/photo', upload.single('image'), userController.uploadPhoto);
router.delete('/photo', userController.deletePhoto);

router.patch(
  '/password',
  userValidator.updatePassword,
  userController.updatePassword,
);

router.get('/address', userController.getAllAddress);
router.post(
  '/address',
  userValidator.createAddress,
  userController.createAddress,
);
router.patch('/address', userController.updateAddress);
router.delete('/address', userController.deleteAddress);

module.exports = router;
