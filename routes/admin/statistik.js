const { fullUrl } = require("../../utils");
const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) =>
  res.render("pages/admin/statistik/read", {
    title: "Statistik | NVA13",
    cannonical: fullUrl(req),
  })
);

Router.get("/info", (req, res) => res.send("Info paslon"));
Router.get("/chartInfo", (req, res) => res.send("Chart.js Label info"));

module.exports = Router;
