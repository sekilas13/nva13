const express = require("express");
const Router = express.Router();

const { fullUrl } = require("../utils");

Router.get("/", (req, res) =>
  res.render("pages/landingPage", {
    cannonical: fullUrl(req),
    title: "Pilih Paslon Mu | NVA13",
  })
);

module.exports = Router;
