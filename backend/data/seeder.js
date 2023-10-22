const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

const SiteUser = require("../models/siteUser.model.js");

const productCategories = require("../models/siteUser.model.js");
const ProductCategory = require("../models/productCategory.model.js");

const Variation = require("../models/variation.js");
const VariationOption = require("../models/variation_option.js");
const ProductVariationConfiguration = require("../models/productVariationConfiguration.js");

const products = require("./products.js");
const Product = require("../models/product.model.js");

const connectDB = require("../config/db.js");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear out all existing data in the database
    await SiteUser.deleteMany();

    await ProductCategory.deleteMany();
    await Product.deleteMany();

    await Variation.deleteMany();
    await VariationOption.deleteMany();
    await ProductVariationConfiguration.deleteMany();

    // Get all categories from the categories array and add the admin user to each category
    const sampleCategories = productCategories.map((category) => {
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

    // Insert all products from the sampleProducts array
    await ProductCategory.insertMany(sampleCategories);
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
    await SiteUser.deleteMany();

    await Product.deleteMany();
    await ProductCategory.deleteMany();

    await Variation.deleteMany();
    await VariationOption.deleteMany();
    await ProductVariationConfiguration.deleteMany();

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
