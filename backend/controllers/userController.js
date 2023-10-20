const User = require("../models/siteUser.model");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

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

exports.getUser = factory.getOne(User);
