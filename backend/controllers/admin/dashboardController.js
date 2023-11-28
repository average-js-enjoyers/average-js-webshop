const { validationResult } = require('express-validator');
const User = require('../../models/user.model');
const Order = require('../../models/order.model');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getAggregates = catchAsync(async (req, res, next) => {
  const ranges = req.body;

  data = [];
  for (const range of ranges) {
    const numActiveUsers = await User.count({
      active: true,
      registrationDate: {
        $gte: new Date(range.startDate),
        $lte: new Date(range.endDate),
      },
    });
    const numOrders = await Order.count({
      orderDate: {
        $gte: new Date(range.startDate),
        $lte: new Date(range.endDate),
      },
    });
    const orderTotalGross = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(range.startDate),
            $lte: new Date(range.endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          orderTotalGross: { $sum: '$orderTotalGross' },
        },
      },
    ]);
    const totalSales =
      orderTotalGross.length > 0 ? orderTotalGross[0].orderTotalGross : 0;

    data.push({
      rangeName: range.rangeName,
      startDate: range.startDate,
      endDate: range.endDate,
      numNewUsers: 10,
      numActiveUsers: numActiveUsers,
      numOrders: numOrders,
      totalSales: totalSales,
      avgOrderValue: 10,
      medianOrderValue: 10,
    });
  }

  res.status(200).json({
    status: 'success',
    data: data,
  });
});
