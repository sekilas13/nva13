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

module.exports = Router;
