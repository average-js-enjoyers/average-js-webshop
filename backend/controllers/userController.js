const User = require("../models/user.model");
const Address = require("../models/address.model");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const admin = require("firebase-admin");
const serviceAccount = require("./../config/firebase/serviceAccountKey.json");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://average-js-webshop.appspot.com",
});

exports.deletePhoto = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Profile']

  const defaultPhoto =
    "https://storage.googleapis.com/profile-photos/default.png";

  await User.findByIdAndUpdate(req.user.id, {
    profilePhoto: defaultPhoto,
  });

  res.status(200).json({
    status: "success",
    data: {
      profilePhoto: defaultPhoto,
    },
  });
});

exports.uploadPhoto = catchAsync(async (req, res, next) => {
  /*  
  #swagger.tags = ['Profile']
  #swagger.consumes = ['multipart/form-data']
  #swagger.parameters[0] = {
    name: 'image',
    in: 'formData',
    type: 'file',
    required: true,
    } */

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const uploadedImage = req.file;

  const imageBuffer = uploadedImage.path; // The image data

  const processedImageBuffer = await sharp(imageBuffer)
    .resize({ width: 800 })
    .toBuffer();

  const bucket = admin.storage().bucket();

  const filePath = `profile-photos/${req.user.id}.jpg`;

  const file = bucket.file(filePath);

  // Stream the file to Firebase Storage
  const fileStream = file.createWriteStream({
    metadata: {
      contentType: "image/jpeg", // Adjust the content type based on your file type
    },
    validation: "md5",
  });

  fileStream.on("error", (error) => {
    fs.unlink(uploadedImage.path, (err) => {
      if (err) {
        console.error("Error deleting the uploaded file:", err);
      }
    });
    res.status(500).json({ error: "Error uploading the image" });
  });

  fileStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

    fs.unlink(uploadedImage.path, (err) => {
      if (err) {
        console.error("Error deleting the uploaded file:", err);
      }
    });

    User.findByIdAndUpdate(req.user.id, { profilePhoto: publicUrl }).exec();

    res.status(200).json({
      message: "Image uploaded and overwritten successfully",
      imageUrl: publicUrl,
    });
  });

  fileStream.write(processedImageBuffer);
  fileStream.end();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el) && el) newObj[el] = obj[el];
  });
  return newObj;
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
  // #swagger.tags = ['Profile']

  const user = await User.findOne({ _id: req.user.id })
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

exports.createAddress = catchAsync(async (req, res, next) => {
  /*  
  #swagger.tags = ['Profile']
  #swagger.parameters['body'] = {
                in: 'body',
                schema: {
                    $unitNumber: '12345',
                    $streetNumber: '12343',
                    $addressLine1: 'Rabbit street',
                    $addressLine1: '',
                    $city: 'New York',
                    $region: 'EAST COAST',
                    $postalCode: '2483',
                    $vatID: '6326434',
                    $country: 'US',
                    $type: 'Commercial',
                }
        } */

  const user = await User.findOne({ _id: req.user.id }).exec();

  const newAddress = await Address.create({
    unitNumber: req.body.unitNumber,
    streetNumber: req.body.streetNumber,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    region: req.body.region,
    postalCode: req.body.postalCode,
    vatID: req.body.vatID,
    countryID: req.body.country, // Assuming countryID is an ObjectId
    type: req.body.type,
  });

  user.addresses.push(newAddress._id);
  user.save();

  res.status(200).json({
    status: "success",
    data: {
      data: newAddress,
    },
  });
});

exports.deleteAddress = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Profile']

  const address = await Address.findById(req.body.id);
  const user = await User.findById(req.user.id);

  if (address === null || !user.addresses.includes(address._id)) {
    return next(new AppError("No address found with that ID", 404));
  }

  await Address.findByIdAndDelete(address._id);

  res.status(204).json({
    status: "success",
    data: {
      data: null,
    },
  });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  /*  
  #swagger.tags = ['Profile']
  #swagger.parameters['body'] = {
    in: 'body',
    schema: {
        id: '614ce88d8101e980a49f0427',
        unitNumber: 101,
        streetNumber: 123,
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 101',
        city: 'City1',
        region: 'Region1',
        postalCode: 12345,
        vatID: 67890,
        country: 'Country1',
        type: 'Residential'
    }
}
  */

  const address = await Address.findById(req.body.id);
  const user = await User.findById(req.user.id);

  if (address === null || !user.addresses.includes(address._id)) {
    return next(new AppError("No address found with that ID", 404));
  }

  // 3) Update user document
  const updateAddress = await Address.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updateAddress,
    },
  });
});
