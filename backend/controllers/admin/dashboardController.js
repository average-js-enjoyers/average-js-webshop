const { validationResult } = require('express-validator');
const catchAsync = require('../../services/catchAsync');
const AppError = require('../../services/appError');
const dashboard = require('../../services/admin/dashboard');
const Order = require('../../models/order.model');

exports.getAggregates = catchAsync(async (req, res, next) => {
  const elements = req.body;

  data = [];
  for (const element of elements) {
    const range = element.range;

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
      range: {
        startDate: range.startDate,
        endDate: range.endDate,
      },
      aggregates: {
        numActiveUsers: numActiveUsers,
        numOrders: numOrders,
        totalSales: totalSales,
        avgOrderValue: avgOrderValue,
        medianOrderValue: medianOrderValue,
      },
    });
  }

  res.status(200).json({
    status: 'success',
    data: data,
  });
});

exports.getOpenOrders = catchAsync(async (req, res, next) => {
  const openStatuses = [
    'Pending',
    'On hold',
    'Payment confirmed',
    'Processing',
    'Shipped',
  ];

  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const skip = (page - 1) * pageSize;

  const totalItems = await Order.countDocuments({
    orderStatus: {
      $in: openStatuses,
    },
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  const getOpenOrders = await Order.find({
    orderStatus: {
      $in: openStatuses,
    },
  })
    .skip(skip)
    .limit(pageSize);

  // Calculate the URL for the next and last pages
  const baseUrl = `${req.protocol}://${req.get('host')}${
    req.originalUrl.split('?')[0]
  }`;

  const previousPage =
    page > 1
      ? `${baseUrl}?page=${Number(page) - 1}&pageSize=${pageSize}`
      : null;
  const nextPage =
    page < totalPages
      ? `${baseUrl}?page=${Number(page) + 1}&pageSize=${pageSize}`
      : null;
  const lastPage = `${baseUrl}?page=${totalPages}&pageSize=${pageSize}`;

  // Set the response headers
  res.set(
    'Link',
    `<${previousPage}>; rel="previous", <${nextPage}>; rel="next", <${lastPage}>; rel="last"`,
  );
  res.set('X-Total-Count', totalItems);

  await res.status(200).json({
    status: 'success',
    pagination: {
      currentPage: page,
      pagesize: pageSize,
      totalItems: totalItems,
      totalPages: totalPages,
    },
    data: getOpenOrders,
  });
});
