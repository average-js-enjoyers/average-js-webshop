const express = require('express');
const authController = require('../../controllers/auth/authController');
const dashboardRouter = require('./dashboardRoutes');

const router = express.Router();

router.use(authController.protect);
router.use(authController.isAdmin);

router.use('/dashboard', dashboardRouter);

module.exports = router;
