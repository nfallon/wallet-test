const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const swaggerConfig = require("./swaggerUI/config");
const utils = require("./_utils");

module.exports = (app, openAPIDef) => {
  // get server path (eg. /wallet-du/v1)
  const apiPath = openAPIDef.servers[0].url;

  // serve swagger file as json
  app.get(`${apiPath}/api-def`, (req, res) => {
    res.send(openAPIDef);
  });

  // serve interractive swagger docs
  app.use(
    `${apiPath}/api-docs`,
    swaggerUi.serve,
    swaggerUi.setup(openAPIDef, swaggerConfig)
  );

  // serve docs describing swagger
  app.get(`${apiPath}/docs`, (req, res) => {
    res.sendFile(path.join(__dirname, "./redocs/index.html"));
  });

  // serve a static test app
  // namespaced the docs, for selective auth
  app.use(`${apiPath}/testapp/`, express.static("views"));
};
