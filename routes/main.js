const { Paslon } = require("../models");
const express = require("express");
const Router = express.Router();

const { fullUrl } = require("../utils");

Router.get("/", (req, res) =>
  Paslon.find({}).then((data) =>
    res.render("pages/landingPage", {
      cannonical: fullUrl(req),
      title: "Pilih Paslon Mu | NVA13",
      data,
    })
  )
);

module.exports = Router;
