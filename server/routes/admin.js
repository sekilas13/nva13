const passport = require("passport");
const express = require("express");
const Router = express.Router();

Router.use((req, res, next) =>
  req.isAuthenticated()
    ? next()
    : req.json({ err: true, message: "Anda belum login" }).status(401)
);

Router.get("/", (req, res) => res.json({ msg: "hello" }));

module.exports = Router;
