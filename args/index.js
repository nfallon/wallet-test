module.exports = {
  name: argumentName => {
    /*
    this function parses the command-line node arguments and returns the argument requested by name.
    if an argument ends with '=' (as Base64 padded values can do), this function preserves the value.
    */
    let i;
    let ix;
    let arg;
    let argumentValue;
    for (i = 0; i < process.argv.length; i += 1) {
      arg = process.argv[i];
      if (arg.indexOf(argumentName) > -1) {
        ix = arg.indexOf("=");
        argumentValue = arg.substring(ix + 1);
        return argumentValue;
      }
    }
  }
};
