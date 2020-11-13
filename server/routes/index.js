const path = require("path");

module.exports = {
  admin: require(path.join(__dirname, "admin.js")),
  // siswa: require(path.join(__dirname, "siswa.js")),
  auth: require(path.join(__dirname, "auth.js")),
};
