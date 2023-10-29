// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

dotenv.config();

//asd
const doc = {
  info: {
    title: 'Average JS Webshop API',
    description: 'A backend API by Average JS Enjoyers',
  },
  host: `localhost:${process.env.PORT}`,
  schemes: ['http'],
  force: true,
  tags: [
    {
      name: 'Auth',
      description: 'API endpoints related to authentication',
    },
    {
      name: 'Profile',
      description: 'API endpoints related to user profile',
    },
  ],
};

const outputFile = './config/swagger/swagger.json';
const endpointsFiles = ['app.js']; // Replace with your Express app file(s)

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // eslint-disable-next-line global-require
  require('../../app');
});
