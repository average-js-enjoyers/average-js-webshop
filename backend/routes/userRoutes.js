const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/login/google", authController.googleLogin);
router.post("/login/facebook", authController.facebookLogin);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.get("/isExists", authController.isExists);

// Protect all routes after this middleware
router.use(authController.protect);
router.get("/me", userController.getUser);
router.patch("/me", userController.updateMe);
router.delete("/me", userController.deleteMe);

router.post("/me/photo", upload.single("image"), userController.uploadPhoto);
router.delete("/me/photo", userController.deletePhoto);

router.patch("/me/password", authController.updatePassword);
router.post("/me/address", userController.createAddress);
router.patch("/me/address", userController.updateAddress);
router.delete("/me/address", userController.deleteAddress);

module.exports = router;
