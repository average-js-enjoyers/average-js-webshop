const express = require('express');
const authController = require('../controllers/authController');
const profileRoutes = require('./user/profileRoutes');

const router = express.Router();

router.use(authController.protect);
router.use('/profile', profileRoutes);

module.exports = router;
