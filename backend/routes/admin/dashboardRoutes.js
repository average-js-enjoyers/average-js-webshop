const express = require('express');
const authController = require('../../controllers/authController');

const router = express.Router();

router.post('/admin/aggregates');

module.exports = router;
