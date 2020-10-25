const express = require("express");
const path = require("path");

const Router = express.Router();

const component = path.resolve("components/admin");
const production = process.env.NODE_ENV === "production";

Router.get("*", (req, res) =>
  !production
    ? res.redirect("http://localhost:4000")
    : res.sendFile(path.join(component, "index.html"))
);

module.exports = Router;
