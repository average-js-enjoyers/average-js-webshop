const { body, param, header } = require('express-validator');
const handleValidationError = require('../utils/handleValidationError');

const baseEmailChain = body('emailAddress')
  .isEmail()
  .withMessage('Invalid email address');

exports.signup = [baseEmailChain, handleValidationError];

exports.login = [
  baseEmailChain,
  body('password').notEmpty(),
  handleValidationError,
];

exports.requestEmailLogin = [
  baseEmailChain,
  header('Confirmation-URL').isURL(),
  handleValidationError,
];

exports.googleLogin = [param('token').notEmpty(), handleValidationError];

exports.facebookLogin = [param('token').notEmpty(), handleValidationError];

exports.forgotPassword = [
  baseEmailChain,
  header('Reset-URL').isURL(),
  handleValidationError,
];

exports.resetPassword = [param('token').notEmpty(), handleValidationError];

exports.isExists = [baseEmailChain, handleValidationError];
