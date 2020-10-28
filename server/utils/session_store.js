const session = require("express-session");
const mongoStore = require("connect-mongodb-session")(session);

require("dotenv").config();
const store = new mongoStore({
  uri: process.env.MONGO_URL,
  collection: "sess_store",
});

module.exports = store;
