const passport = require("passport");
const express = require("express");
const Router = express.Router();

Router.use(
  (req, res, next) =>
    req.isAuthenticated()
      ? next()
      : req.json({ err: true, message: "Anda belum login" }).status(401),
  (req, res, next) =>
    passport.authenticate("jwt", { session: false }, (error, user) => {
      if (error) {
        req
          .json({
            err: true,
            message: "Ada kesalahan server, mohon hubungi admin",
          })
          .status(503);
      } else {
        if (user) next();
      }
    })(req, res, next)
);

Router.get("/", (req, res) => res.json({ msg: "hello" }));

module.exports = Router;
