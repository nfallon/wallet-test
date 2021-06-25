// API modules

const parameters = require("../helpers/parameters");
const ping = require("../api/ping");
const wallet = require("../api/wallet");

const controllers = {
  ping,
  wallet
};

module.exports = function routes(app, db, openAPIDef, validator) {
  // create express routes using the openAPI definition.

  // get server path (eg. /peerpayments/v1)
  const apiPath = openAPIDef.servers[0].url;

  Object.keys(openAPIDef.paths).forEach(path => {
    // for each path
    const pathInfo = openAPIDef.paths[path];

    // for each method (get/post/put/delete)
    Object.keys(pathInfo).forEach(restMethod => {
      // get the REST method, controller and function names from openAPI def
      const methodInfo = pathInfo[restMethod];

      const operation = methodInfo.operationId.split("/");
      const routerController = operation[0];
      const routerMethod = operation[1];

      // get the path and convert {parm} to :parm so express can use it as a route
      const modifiedPath = parameters.convertBracketsToColon(path);
      const expressPath = `${apiPath}${modifiedPath}`;

      // output a list of routes to the console
      console.log(
        `created route ${expressPath} --> ${routerController}.${routerMethod}`
      );

      // create an express route
      app[restMethod](
        expressPath,
        validator.validate(restMethod, path),
        controllers[routerController][routerMethod](db)
      );

    });
  });

};
