const express = require("express");
const siswa = require("./siswa");
const Router = express.Router();

Router.use("/siswa", siswa);

module.exports = Router;
