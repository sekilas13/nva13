const path = require("path");

module.exports = {
  local: require(path.join(__dirname, "local.js")),
  jwt: require(path.join(__dirname, "jwt.js")),
};
