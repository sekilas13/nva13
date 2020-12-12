const express = require("express");
const Router = express.Router();

const { fullUrl } = require("../utils");

Router.use((req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.render("404", {
      cannonical: fullUrl(req),
      title: "Halaman Tidak Ditemukan | 404 | NVA13",
      url: req.url,
    });
    return;
  }

  if (req.accepts("json")) {
    res.json({ error: true, message: "Halaman tidak ada !" });
    return;
  }

  res.type("txt").send("Halaman tidak ada !");
});

module.exports = Router;
