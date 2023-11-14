const { ObjectId } = require('mongodb');
const clipboardy = require('node-clipboardy');

const products = require('../data/products');
const variations = require('../data/variations');

const productItems = [];

products.forEach((product) => {
  const catVars = variations.filter(
    (v) => v.category_id === product.categoryID,
  );
  console.log(product.name);
  console.log(catVars);
});
