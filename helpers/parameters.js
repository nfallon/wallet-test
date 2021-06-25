/*

convert path strings containing parameters like this:

{parameter}

to this:

:parameter

*/

exports.convertBracketsToColon = path => {
  let modifiedPath = path;
  // get the path and convert {parm} to :parm so express can use it as a route
  while (modifiedPath.indexOf("{") > -1) {
    const paramName = modifiedPath.substring(
      modifiedPath.lastIndexOf("{") + 1,
      modifiedPath.lastIndexOf("}")
    );
    modifiedPath = modifiedPath.replace(`{${paramName}}`, `:${paramName}`);
  }
  return modifiedPath;
};
