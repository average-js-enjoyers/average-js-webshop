const express = require('express');
const dashboardController = require('../../controllers/admin/dashboardController');

const router = express.Router();

router.post('/aggregates', dashboardController.getAggregates);

module.exports = router;
