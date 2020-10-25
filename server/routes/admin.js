const path = require("path");
const express = require("express");
const session = require("express-session");
const mongoStore = require("connect-mongodb-session")(session);

require("dotenv").config();
const store = new mongoStore({
  uri: process.env.MONGO_URL,
  collection: "sess",
});

const component = path.resolve("components/admin");
const production = process.env.NODE_ENV === "production";

const Router = express.Router();

Router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

Router.get("*", (req, res) =>
  !production
    ? res.redirect("http://localhost:4000")
    : res.sendFile(path.join(component, "index.html"))
);

module.exports = Router;
