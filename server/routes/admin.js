const passport = require("passport");
const express = require("express");
const user = require("./sub/user");
const Router = express.Router();

Router.use(
  (req, res, next) =>
    req.isAuthenticated()
      ? next()
      : res.json({ err: true, message: "Anda belum login" }).status(401),
  (req, res, next) =>
    passport.authenticate("jwt", { session: false }, (error, user) => {
      if (error) {
        res
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

Router.use("/user", user);

module.exports = Router;
