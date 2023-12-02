const express = require('express');
const authController = require('../../controllers/admin/authController');
const dashboardRouter = require('./dashboardRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/auth', authRoutes);

router.use(authController.protect);
router.use('/dashboard', dashboardRouter);

module.exports = router;
