const responseHandler = require("../helpers/responseHandler");

module.exports = app => {
  app.use((err, req, res, next) => {
    responseHandler(100000, err, req, res, err.data);
  });
};
