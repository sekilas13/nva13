const { Paslon } = require("../../models");
const { fullUrl } = require("../../utils");
const express = require("express");
const multer = require("multer");
const Router = express.Router();
const path = require("path");
const fs = require("fs");

const uploadDir = path.resolve("public/uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + Date.now() + `.${ext}`);
  },
});

const upload = multer({ storage });

Router.get("/", (req, res) =>
  Paslon.find({}).then((data) =>
    res.render("pages/admin/paslon/read", {
      title: "Daftar Paslon | NVA13",
      cannonical: fullUrl(req),
      data,
    })
  )
);

Router.get("/tambah", (req, res) =>
  res.render("pages/admin/paslon/add", {
    title: "Tambah Paslon | NVA13",
    cannonical: fullUrl(req),
  })
);

Router.post("/tambah", upload.single("gambarPaslon"), (req, res) => {
  const { nameKetua, nameWaketu } = req.body;
  const obj = {
    ketua: nameKetua,
    wakil: nameWaketu,
    img: {
      data: fs.readFileSync(path.join(uploadDir, req.file.filename)),
      contentType: req.file.mimetype,
    },
  };

  console.log(obj);

  res.redirect("/admin/paslon");
});

module.exports = Router;
