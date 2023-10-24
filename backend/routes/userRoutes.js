const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);
router.get("/me", userController.getUser);
router.patch("/me", userController.updateMe);
router.delete("/me", userController.deleteMe);

router.patch("/me/password", authController.updatePassword);
router.post("/me/address", userController.createAddress);
router.patch("/me/address", userController.updateAddress);
router.delete("/me/address", userController.deleteAddress);

module.exports = router;
