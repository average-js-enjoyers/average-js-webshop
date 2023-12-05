const handleValidationError = require('../../services/handleValidationError');
const { body, query, validationResult } = require('express-validator');
const { isDate, isAfter, isBefore } = require('validator');

// Function to calculate days between two dates
const daysBetweenDates = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const diffDays = Math.round((firstDate - secondDate) / oneDay);

  return diffDays;
};

exports.aggregates = [
  body()
    .isArray({ min: 1 })
    .withMessage('Request must contain at least one range!'),
  body('**.startDate').isDate().withMessage('Invalid start date format!'),
  body('**.endDate').isDate().withMessage('Invalid end date format!'),
  body('*.range')
    .custom((value) => {
      const days = daysBetweenDates(value.endDate, value.startDate);
      return days >= 0;
    })
    .withMessage('Start date must be before end date.'),
  body('*.range')
    .custom((value) => {
      const days = daysBetweenDates(value.endDate, value.startDate);
      return days <= 365;
    })
    .withMessage('Range cannot be longer than 365 days!'),

  handleValidationError,
];

exports.openOrders = [
  query('page')
    .isInt({
      gt: 0,
    })
    .withMessage('Page must be greater than zero!'),
  query('pageSize')
    .isInt({
      gt: 0,
      lt: 11,
    })
    .withMessage('Page size must be greater than 1 and less or equal than 10!'),
  handleValidationError,
];
