// responseHandler
const responseMessages = require("./responses");

module.exports = (code, error, req, res, data) => {
  // a generic function for sending back a HTTP response with JSON payload.
  // this includes 'good' responses (status 200) and 'bad' responses (4xx/5xx).

  // the data parameter allows the caller to specify an object with a variable number of properties which contain
  // any response-related data that the caller wants to return in their error response.
  // example:
  // errorhandler.respond(100001, error, req, res, { data1, data2: someobject.data2 });

  // this app uses a package called express-openapi-validate to verify REST call input parameters
  // based on our openAPI definition in openapi.3.0.0.json. Validation errors end up here just like other errors,
  // but they all use the error code 100000 to indicate they were automatically detected. These errors provide
  // custom messages in the data parameter, so we handle these as a special case and reformat them so that the
  // error response to the user matches our other errors.

  let returnJson = {};

  let inputData = data;
  if (code === 100000) {
    // the automated validation found an error in some input data - report a 400 validation error

    const { message } = error;
    const displayMessage = error.message;
    const hint = error.message;

    if (!inputData) {
      inputData = [{}];
    }

    res.status(400);
    returnJson = {
      errors: {
        code,
        error: inputData[0]
      },
      url: req.originalUrl,
      message,
      displayMessage,
      hint,
      data: {}
    };
  } else {
    // discover the HTTP response and error messages using the supplied code
    const response = responseMessages.messages[code];
    if (!response) {
      // could not find this response code
      console.log(
        `WARNING: response code ${code} does not exist in the responses list in helpers/responses.js. Please add this code to the list.`
      );
      res.json({ unknownErrorCode: code });
      return true;
    }
    const { httpCode, message, displayMessage, hint } = response;
    res.status(httpCode);

    if (httpCode === 200) {
      returnJson = {
        success: {
          code
        },
        url: req.originalUrl,
        message,
        displayMessage,
        hint,
        data: inputData
      };
    } else {
      returnJson = {
        errors: {
          code,
          error
        },
        url: req.originalUrl,
        message,
        displayMessage,
        hint,
        data: inputData
      };
    }

    // iterate all objects in the data object and attach them to the returnJson object.
    // on the client, this avoids a 'data.data' situation.

    Object.keys(inputData).forEach(key => {
      returnJson[key] = inputData[key];
    });
  }

  // send a HTTP response with JSON payload
  res.json(returnJson);

  return true;
};
