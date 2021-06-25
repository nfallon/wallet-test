

//Access-Control-Allow-Origin
exports.corsHeaders = function(req, res, next) {
  // Allow cross-origin resource sharing (CORS)
  // res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
};

//intercept invalid JSON payloads
exports.catchInvalidJSON = function(error, req, res, next) {
  var str = JSON.stringify(error);
  if (str.indexOf('"statusCode":400') > 0) {
    res.status(400);
    res.json({ error: "Input data is not valid JSON." });
    return false;
  } else {
    next();
  }
};
