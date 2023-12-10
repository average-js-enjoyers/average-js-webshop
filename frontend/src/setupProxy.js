const { createProxyMiddleware } = require("http-proxy-middleware");
const { REACT_APP_API_PROXY_URL, REACT_APP_API_PROXY_PORT } = process.env;

module.exports = function (app) {
  app.use(
    "/api", // This is your API prefix
    createProxyMiddleware({
      target: `${REACT_APP_API_PROXY_URL}:${REACT_APP_API_PROXY_PORT}`,
      changeOrigin: true,
    })
  );
};
