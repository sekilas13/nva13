const express = require("express");
const siswa = require("./siswa");
const Router = express.Router();

Router.get("/siswa", siswa);

module.exports = Router;
