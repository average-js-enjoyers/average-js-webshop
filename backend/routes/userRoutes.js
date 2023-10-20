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
router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(() => {
    // #swagger.tags = ['Admin']
    return userController.getAllUsers;
  })
  .post(() => {
    // #swagger.tags = ['Admin']
    return userController.createUser;
  });

router
  .route("/:id")
  .get(() => {
    // #swagger.tags = ['Admin']
    return userController.getUser;
  })
  .patch(() => {
    // #swagger.tags = ['Admin']
    return userController.updateUser;
  })
  .delete(() => {
    // #swagger.tags = ['Admin']
    return userController.deleteUser;
  });

module.exports = router;
