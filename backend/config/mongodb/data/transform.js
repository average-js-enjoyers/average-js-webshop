const { ObjectId } = require('mongodb');
const clipboardy = require('node-clipboardy');

const products = require('./products');

// Add ObjectID to each product
const productsWithObjectID = products.map((product) => ({
  _id: new ObjectId().toString(),
  ...product,
}));

const jsArrayString = JSON.stringify(productsWithObjectID, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);
