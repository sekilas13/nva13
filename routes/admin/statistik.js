const { Paslon } = require("../../models");
const { fullUrl } = require("../../utils");
const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) =>
  res.render("pages/admin/statistik/read", {
    title: "Statistik | NVA13",
    cannonical: fullUrl(req),
  })
);

Router.get("/info", (req, res) => {
  Paslon.find()
    .lean()
    .exec()
    .then((data) =>
      res.json({ data: data.map(({ __v, img, ...data }) => data) })
    );
});

module.exports = Router;
