const path = require("path");
const express = require("express");
const session = require("express-session");
const { userAdmin } = require("../models");
const { admin: passport } = require("../passport");
const { admin: store } = require("../store");

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

Router.post("/session", (req, res) => {
  if (req.session) {
    const { passport } = req.session;
    userAdmin
      .findOne({ _id: passport.user })
      .then((u) => res.status(200).json({ _id: u._id, username: u.username }))
      .catch((e) => {
        console.log(e);
        res.end();
      });
  } else {
    res.status(401).json({ message: "HTTP 401 Unauthorized" });
  }
});

module.exports = Router;
