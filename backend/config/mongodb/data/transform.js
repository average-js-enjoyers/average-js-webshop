const { ObjectId } = require('mongodb');
const clipboardy = require('node-clipboardy');

const products = require('./products');

// // Add ObjectID to each product
// const productsWithObjectID = products.map((product) => ({
//   _id: new ObjectId().toString(),
//   name: product.name,
//   description: product.description,
//   category_id: product.category_id,
// }));

// const jsArrayString = JSON.stringify(productsWithObjectID, null, 2);

const properties = products.flatMap((product) =>
  Object.entries(product)
    .filter(
      ([key]) => !['_id', 'name', 'description', 'category_id'].includes(key),
    )
    .map(([key, value]) => ({
      _id: new ObjectId().toString(),
      key: key,
      value: value,
      category_id: product.category_id,
    })),
);

const distinctProperties = (properties) => {
  const uniqueCombinations = new Set();

  return properties.filter((property) => {
    const key = `${property.key}-${property.value}-${property.category_id}`;

    if (!uniqueCombinations.has(key)) {
      uniqueCombinations.add(key);
      return true;
    }

    return false;
  });
};

const distinctPropertiesArray = distinctProperties(properties);

const jsArrayString = JSON.stringify(distinctPropertiesArray, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);
