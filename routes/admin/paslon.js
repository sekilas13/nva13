const { fullUrl } = require("../../utils");
const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) =>
  res.render("pages/admin/paslon/read", {
    title: "Daftar Paslon | NVA13",
    cannonical: fullUrl(req),
  })
);

module.exports = Router;
