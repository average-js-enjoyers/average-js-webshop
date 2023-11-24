const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const clipboardy = require('node-clipboardy');

const numOfAddresses = 100;
const addresses = [];

for (let i = 0; i < numOfAddresses; i++) {
  const address = createRandomAddress();
  addresses.push(address);
}

const jsArrayString = JSON.stringify(addresses, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);

function createRandomAddress() {
  return {
    _id: new mongoose.Types.ObjectId(),
    unitNumber: Number(faker.location.buildingNumber()),
    streetNumber: Number(faker.location.buildingNumber()),
    addressLine1: faker.location.streetAddress({ useFullAddress: true }),
    addressLine2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    region: faker.location.state(),
    postalCode: Number(faker.location.zipCode('####')),
    vatID: faker.number.int(66666, 99999),
    country: faker.location.county(),
    type: faker.helpers.arrayElement(['Both', 'Shipping', 'Billing']),
  };
}
