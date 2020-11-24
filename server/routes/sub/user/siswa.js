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

  User.findOne({ email }).then(async (data) => {
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

Router.put("/", (req, res) => {
  const { _id, email, ...update } = req.body;
  User.findOneAndUpdate(
    { _id, email },
    { ...update },
    { new: true, lean: true }
  ).then((update) => {
    const { password, _v, ...send } = update;
    res
      .json({
        error: false,
        message: "Data siswa berhasil diperbarui",
        data: send,
      })
      .status(200);
  });
});

Router.delete("/", async (req, res) => {
  User.findByIdAndDelete(req.body._id).then(() =>
    res.json({ error: false, message: "Siswa berhasil dihapus" }).status(200)
  );
});

Router.post("/import", (req, res) => {
  console.log(req.body);
  res.end();
});

module.exports = Router;
