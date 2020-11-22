const { User } = require("../../../models");
const express = require("express");
const bcrypt = require("bcrypt");
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

Router.post("/", (req, res) => {
  const { email, username, absen, password, kelas } = req.body;

  User.findOne({ role: "siswa", email }).then(async (data) => {
    if (data)
      return res
        .json({ error: true, message: "Email telah terdaftar" })
        .status(409);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await User.create({
      email,
      role: "siswa",
      username,
      password: hash,
      kelas,
      absen,
    }).then(() =>
      res
        .json({ error: false, message: "Data berhasil ditambahkan" })
        .status(200)
    );
  });
});

Router.delete("/", async (req, res) => {
  User.findByIdAndDelete(req.body._id).then(() =>
    res.json({ error: false, message: "Siswa berhasil dihapus" }).status(200)
  );
});

module.exports = Router;
