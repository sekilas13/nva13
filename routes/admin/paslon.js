const { Paslon } = require("../../models");
const { fullUrl } = require("../../utils");
const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) =>
  Paslon.find({}).then((data) =>
    res.render("pages/admin/paslon/read", {
      title: "Daftar Paslon | NVA13",
      cannonical: fullUrl(req),
      data,
    })
  )
);

Router.get("/tambah", (req, res) =>
  res.render("pages/admin/paslon/add", {
    title: "Tambah Paslon | NVA13",
    cannonical: fullUrl(req),
  })
);

module.exports = Router;
