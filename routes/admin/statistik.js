const { fullUrl } = require("../../utils");
const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) =>
  res.render("pages/admin/statistik/read", {
    title: "Statistik | NVA13",
    cannonical: fullUrl(req),
  })
);

module.exports = Router;
