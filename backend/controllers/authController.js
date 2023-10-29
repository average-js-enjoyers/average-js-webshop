const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
const axios = require('axios');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.isExists = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Auth']

  const emailAddress = req.body.email;

  const user = await User.findOne({ emailAddress });

  const value = user !== null;

  res.status(200).json({
    status: 'success',
    data: {
      exists: value,
    },
  });
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Auth']

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailConfirmationToken: hashedToken,
    emailConfirmationExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.emailConfirmed = true;
  user.emailConfirmationToken = undefined;
  user.emailConfirmationExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

exports.requestEmailLogin = catchAsync(async (req, res, next) => {
  /*  
  // #swagger.tags = ['Auth']
   #swagger.parameters['body'] = {
                in: 'body',
                schema: {
                    $emailAddress: 'example@example.com'
                }
              }
  #swagger.parameters['Confirmation-URL'] = {
                in: 'header',
                type: 'string'
        } */

  const { emailAddress } = req.body;

  // 1) Check if email and password exist
  if (!emailAddress) {
    return next(new AppError('Please provide email!', 400));
  }

  const user = await User.findOne({ emailAddress });

  if (!user) {
    return next(
      new AppError('There is no user associated with this email!', 400),
    );
  }

  if (user.emailConfirmed) {
    return next(new AppError('This email has already been confirmed!', 400));
  }

  const confirmCallback = req.get('Confirmation-URL');

  if (!confirmCallback) {
    return next(
      new AppError('There is no confirmation URL defined in the header.', 404),
    );
  }

  // 2) Generate the random reset token
  const token = signToken(user._id);

  // 3) Send it to user's email
  const confirmURL = `${confirmCallback}/${token}`;

  const message = `Welcome to Average JS Webshop! We are thrilled to have you as a new member of our online community. Thank you for choosing us for your shopping needs. Click here to confirm your email: ${confirmURL}`;

  try {
    await sendEmail({
      emailAddress: user.emailAddress,
      subject: '(AJSE) Email confirmation',
      message: message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
});

exports.signup = catchAsync(async (req, res, next) => {
  /*  
  // #swagger.tags = ['Auth']
  #swagger.parameters['body'] = {
                in: 'body',
                schema: {
                    $emailAddress: 'example@example.com',
                    $password: 'Password123',
                    $passwordConfirm: 'Password123',
                }
  } */

  const { emailAddress } = req.body;

  // 1) Check if email and password exist
  if (!emailAddress) {
    return next(new AppError('Please provide email!', 400));
  }

  const newUser = await User.create({
    emailAddress: req.body.emailAddress,
  });

  res.status(200).json({
    status: 'success',
    data: {
      message:
        'Email confirmation is required. Send a POST request to api/users/email/request',
      data: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  /*  
  // #swagger.tags = ['Auth']
  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    $emailAddress: 'user1@example.com',
                    $password: 'Password123',
                }
        } */

  const { emailAddress, password } = req.body;

  // 1) Check if email and password exist
  if (!emailAddress || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ emailAddress }).select('+password');

  if (
    !user ||
    user.password === undefined ||
    !(await user.correctPassword(password, user.password))
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.googleLogin = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Auth']

  const accessToken = req.params.token;

  const oAuth2Client = new google.auth.OAuth2();

  oAuth2Client.setCredentials({
    access_token: accessToken,
  });

  // Now you can use the oAuth2Client to fetch user information
  const oauth2 = google.oauth2({
    auth: oAuth2Client,
    version: 'v2',
  });

  const userInfo = await oauth2.userinfo.get();

  const firstName = userInfo.data.given_name;
  const lastName = userInfo.data.family_name;
  const emailAddress = userInfo.data.email;
  const profilePhoto = userInfo.data.picture;

  let user = await User.findOne({ emailAddress });

  if (!user) {
    user = await User.create({
      emailAddress,
      firstName,
      lastName,
      profilePhoto,
      externalAuth: true,
    });
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.facebookLogin = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Auth']

  const accessToken = req.params.token;

  const apiUrl = `https://graph.facebook.com/v18.0/me?fields=id,email,first_name,last_name&access_token=${accessToken}`;

  const response = await axios.get(apiUrl);

  const emailAddress = response.data.email;
  const firstName = response.data.first_name;
  const lastName = response.data.last_name;

  let user = await User.findOne({ emailAddress });

  if (!user) {
    user = await User.create({
      emailAddress,
      firstName,
      lastName,
      externalAuth: true,
    });
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Auth']

  // 1) Get user based on POSTed email
  const user = await User.findOne({ emailAddress: req.body.emailAddress });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const resetCallback = req.get('Reset-URL');
  if (!resetCallback) {
    return next(
      new AppError('There is no reset URL defined in the header.', 404),
    );
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${resetCallback}/${resetToken}`;

  const message = `Forgot your password? Click here to reset your password: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      emailAddress: user.emailAddress,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Auth']

  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Profile']

  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
