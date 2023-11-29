const express = require('express');
const dashboardController = require('../../controllers/admin/dashboardController');
const dashboardValidator = require('../../validators/admin/dashboardValidator');

const router = express.Router();

router.post(
  '/aggregates',
  dashboardValidator.aggregates,
  dashboardController.getAggregates,
);

router.get('/pending-orders', dashboardController.getPendingOrders);

module.exports = router;
