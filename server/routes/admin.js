const path = require("path");
const express = require("express");
const session = require("express-session");
const { admin: passport } = require("../passport");
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

Router.use(passport.initialize());
Router.use(passport.session());

Router.get("*", (req, res) =>
  !production
    ? res.redirect("http://localhost:4000")
    : res.sendFile(path.join(component, "index.html"))
);

Router.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: info });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res
        .status(200)
        .json({
          success: true,
          user: { id: user.id, username: user.username },
        });
    });
  })(req, res, next);
});

module.exports = Router;
