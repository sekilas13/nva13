const { User } = require("../../../models");
const express = require("express");
const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const siswa = await User.find({ role: "siswa" });

    res.json({ error: false, data: siswa });
    res.end();
  } catch (e) {
    res.json({ error: true, msg: e }).status(503);
  }
});

module.exports = Router;
