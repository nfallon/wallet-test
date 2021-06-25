// css is manually minified from ./styes.css and saved as a module
// which exports a string in ./styes.js
// recommended: https://cssminifier.com/
const css = require("./styles");

module.exports = {
  customCss: css,
  customfavIcon: "https://www.rocketlawyer.net/favicon_rocketlawyer.png",
  customSiteTitle: "Wallet API Docs"

  // Also available:
  // - customJs
  // - isExplorer
  // - options
  // - swaggerUrl
};
