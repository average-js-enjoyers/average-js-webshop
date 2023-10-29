const { body } = require('express-validator');
const handleValidationError = require('../utils/handleValidationError');

exports.onboard = [
  // Define validation rules using express-validator
  body('firstName')
    .isAlpha()
    .withMessage('First name must contain only letters'),
  body('lastName').isAlpha().withMessage('Last name must contain only letters'),
  body('phoneNumber')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Invalid phone number'),
  handleValidationError,
];
