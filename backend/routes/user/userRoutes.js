const express = require('express');
const authController = require('../../controllers/auth/authController');
const profileRoutes = require('./profileRoutes');

const router = express.Router();

router.use(authController.protect);
router.use('/profile', profileRoutes);

module.exports = router;
