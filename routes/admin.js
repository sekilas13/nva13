const { fullUrl } = require("../utils");
const { User } = require("../models");
const passport = require("passport");
const express = require("express");
const bcrypt = require("bcrypt");
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
Router.post("/daftar", checkNotAuthenticated, (req, res) => {
  const { email, username, password } = req.body;

  User.findOne({ email }).then(async (u) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!u) {
      await User.create({
        email,
        username,
        password: hash,
      });
      req.flash("success", "Admin baru berhasil ditambahkan, silahkan login");
      res.redirect("/admin/login");
    } else {
      req.flash("error", "Akun sudah terdaftar !");
      res.redirect("/admin/daftar");
    }
  });
});

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
