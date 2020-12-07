const { fullUrl } = require("../utils");
const passport = require("passport");
const express = require("express");
const Router = express.Router();

Router.get("/", checkAuthenticated, (req, res) => res.send("Admin"));

Router.get("/login", checkNotAuthenticated, (req, res) =>
  res.render("pages/admin/login", {
    title: "Login sebagai Admin | NVA13",
    cannonical: fullUrl(req),
  })
);
Router.get("/daftar", checkNotAuthenticated, (req, res) =>
  res.render("pages/admin/daftar", {
    title: "Daftarkan Akun Admin | NVA13",
    cannonical: fullUrl(req),
  })
);

Router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin/login",
    failureFlash: true,
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
