const { validationResult } = require('express-validator');
const User = require('../../models/user.model');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const dashboard = require('../../utils/admin/dashboard');
const Order = require('../../models/order.model');

exports.getAggregates = catchAsync(async (req, res, next) => {
  const ranges = req.body;

  data = [];
  for (const range of ranges) {
    const numActiveUsers = await dashboard.numActiveUsers(
      range.startDate,
      range.endDate,
    );

    const numOrders = await dashboard.numOrders(range.startDate, range.endDate);

    const totalSales = await dashboard.totalSales(
      range.startDate,
      range.endDate,
    );

    const avgOrderValue = await dashboard.avgOrderValue(
      range.startDate,
      range.endDate,
    );

    const medianOrderValue = await dashboard.medianOrderValue(
      range.startDate,
      range.endDate,
    );

    data.push({
      rangeName: range.rangeName,
      startDate: range.startDate,
      endDate: range.endDate,
      numActiveUsers: numActiveUsers,
      numOrders: numOrders,
      totalSales: totalSales,
      avgOrderValue: avgOrderValue,
      medianOrderValue: medianOrderValue,
    });
  }

  res.status(200).json({
    status: 'success',
    data: data,
  });
});
