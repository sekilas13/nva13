const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => res.json({ msg: "hello" }));

module.exports = Router;
