const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

// Users
const User = require("../../models/user.model.js");
const Address = require("../../models/address.model.js");

// Products
const Product = require("../../models/product.model.js");
const Category = require("../../models/category.model.js");

const users = require("./data/users.js");
const addresses = require("./data/addresses.js");
const categories = require("./data/categories.js");
const products = require("./data/products.js");

const connectDB = require("./db.js");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear out all existing data in the database
    await User.deleteMany();
    await Address.deleteMany();

    await Category.deleteMany();
    await Product.deleteMany();

    const sampleAddresses = addresses.map((address) => {
      return {
        _id: new mongoose.Types.ObjectId(address._id), // Generate a new ObjectId for each address
        unitNumber: address.unitNumber,
        streetNumber: address.streetNumber,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        region: address.region,
        postalCode: address.postalCode,
        vatID: address.vatID,
        countryID: address.country, // Assuming countryID is an ObjectId
        type: address.type,
      };
    });

    // Get all users
    const sampleUsers = users.map((user) => {
      return {
        _id: new mongoose.Types.ObjectId(user._id),
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        registrationDate: user.registrationDate,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
        active: user.active,
        addresses: user.addresses,
      };
    });

    // Get all categories from the categories array and add the admin user to each category
    const sampleCategories = categories.map((category) => {
      return {
        _id: new mongoose.Types.ObjectId(category._id),
        categoryName: category.categoryName,
        parentCategory: new mongoose.Types.ObjectId(category.parentCategory),
      };
    });

    // Get all products from the products array and add the admin user to each product
    const sampleProducts = products.map((product) => {
      return {
        name: product.name,
        description: product.description,
        categoryID: new mongoose.Types.ObjectId(product.categoryID),
      };
    });

    await User.create(sampleUsers);
    await Address.insertMany(sampleAddresses);
    await Category.insertMany(sampleCategories);
    await Product.insertMany(sampleProducts);

    /* await ProductCategory.create(...sampleCategories);
    await Product.create(...sampleProducts); */

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear out all existing data in the database
    await User.deleteMany();
    await Address.deleteMany();

    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// console.log(process.argv);

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}