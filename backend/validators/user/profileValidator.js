const { body } = require('express-validator');
const handleValidationError = require('../../services/handleValidationError');
const passwordRules = require('../../config/mongodb/passwordRules');

exports.onboard = [
  // Define validation rules using express-validator
  body('firstName')
    .isString()
    .withMessage('First name must contain only letters'),
  body('lastName')
    .isString()
    .withMessage('Last name must contain only letters'),
  body('phoneNumber')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Invalid phone number'),
  handleValidationError,
];

exports.updateMe = [
  // Define validation rules using express-validator
  body('firstName')
    .isString()
    .withMessage('First name must contain only letters'),
  body('lastName')
    .isString()
    .withMessage('Last name must contain only letters'),
  body('phoneNumber')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Invalid phone number'),
  handleValidationError,
];

exports.updatePassword = [
  body('passwordCurrent').notEmpty(),
  body('password').isStrongPassword(passwordRules),
  body('passwordConfirm').isStrongPassword(passwordRules),
  handleValidationError,
];

exports.createAddress = [
  // Unit Number (optional)
  body('unitNumber').optional().isInt(),

  // Street Number (required)
  body('streetNumber').notEmpty().isInt(),

  // Address Line 1 (required)
  body('addressLine1').notEmpty().isString(),

  // Address Line 2 (optional)
  body('addressLine2').optional().isString(),

  // City (required)
  body('city').notEmpty().isString(),

  // Region (optional)
  body('region').optional().isString(),

  // Postal Code (required)
  body('postalCode').notEmpty().isInt(),

  // VAT ID (optional)
  body('vatID').optional().isInt(),

  // Country (required)
  body('country').notEmpty().isString(),

  // Type (required)
  body('type').notEmpty().isIn(['Both', 'Individual', 'Company']), // Assuming 'type' should be one of these values

  handleValidationError,
];
