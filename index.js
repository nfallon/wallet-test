
// npm i express --save
// npm i express-openapi-validate --save
// npm i pg --save 
// npm i swagger-ui-express --save
// npm i ethereumjs-wallet --save

// express server
const port = process.env.PORT || 80
const express = require("express");


// openAPI
const { OpenApiValidator } = require("express-openapi-validate");
const openAPIDef = require("./openapi.3.0.0.json");
const validator = new OpenApiValidator(openAPIDef);
const app = express();

// postgresDB
const db = require("./db");

// ROUTES
require("./routes/middleware")(app, db);

// load the product routes
require("./routes/index")(app, db, openAPIDef, validator);

// validate routes
require("./routes/validation")(app);

// load documentation routes
// this is separate so it can be conditionally ignored in prod
require("./routes/docs")(app, openAPIDef);


// show all args
console.log(process.argv);
console.log(`package version ${process.env.npm_package_version}`);
// start server
const server = app.listen(port, () => {
  console.log(`wallet-du swagger portal at http://localhost:${port}/wallet-du/v1/api-docs`);
});

// stop server
server.on("close", () => {
  db.pool.end(() => {
    console.log("connection pool closed");
  });
});
