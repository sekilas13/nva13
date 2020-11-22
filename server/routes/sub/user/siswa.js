const { User } = require("../../../models");
const express = require("express");
const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const siswa = await User.find({ role: "siswa" }).lean().exec();

    res.json({
      error: false,
      data: siswa.map(({ password, __v, ...data }) => data),
    });
  } catch (e) {
    res.json({ error: true, msg: e }).status(503);
  }
});

module.exports = Router;
