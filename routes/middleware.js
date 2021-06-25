const bodyParser = require("body-parser");
const utils = require("./_utils");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(utils.catchInvalidJSON);
  app.use(utils.corsHeaders);
};
