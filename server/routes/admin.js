const path = require("path");
const express = require("express");
const session = require("express-session");
const { admin: passport } = require("../passport");
const mongoStore = require("connect-mongodb-session")(session);

require("dotenv").config();
const store = new mongoStore({
  uri: process.env.MONGO_URL,
  collection: "sess_admin",
});

const component = path.resolve("components/admin");
const production = process.env.NODE_ENV === "production";
const expired = 30 * 60 * 1000;

const Router = express.Router();

Router.use(
  session({
    name: "se_si_addm",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      maxAge: expired,
      expires: new Date(Date.now() + expired),
    },
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
      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          sessID: {
            value: req.sessionID,
            expires: expired,
          },
        },
      });
    });
  })(req, res, next);
});

module.exports = Router;
