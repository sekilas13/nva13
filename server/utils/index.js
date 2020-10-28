const path = require("path");

module.exports = {
  passport: require(path.join(__dirname, "passport.js")),
  sessionStore: require(path.join(__dirname, "session_store.js")),
};
