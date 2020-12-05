const express = require("express");
const { fullUrl } = require("../utils");
const Router = express.Router();

Router.get("/", checkAuthenticated, (req, res) => res.send("Admin"));
Router.get("/login", checkNotAuthenticated, (req, res) =>
  res.render("pages/admin/login", {
    title: "Login sebagai Admin | NVA13",
    cannonical: fullUrl(req),
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/admin/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }
  next();
}

module.exports = Router;
