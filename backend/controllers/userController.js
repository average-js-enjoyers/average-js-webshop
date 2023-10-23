const User = require("../models/user.model");
const Address = require("../models/address.model");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el) && el) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  // #swagger.tags = ['Profile']
  req.params.id = req.user.id;
  next();
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Profile']

  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  /*  
  #swagger.tags = ['Profile']
  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    $firstName: 'John',
                    $lastName: 'Doe',
                    $phoneNumber: '+36201230044'
                }
        } */

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "phoneNumber"
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id })
    .populate("addresses")
    .exec();

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});
