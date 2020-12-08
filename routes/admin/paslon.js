const ObjectID = require("mongoose").Types.ObjectId;
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

Router.get("/ubah", (req, res) => res.redirect("/admin/paslon"));
Router.get("/ubah/:_id", (req, res) => {
  const { _id } = req.params;

  if (ObjectID.isValid(_id) === true) {
    Paslon.findById(_id).then((data) => {
      if (data) {
        res.render("pages/admin/paslon/update", {
          title: "Perbarui Data Paslon | NVA13",
          cannonical: fullUrl(req),
          data,
        });
      } else {
        res.redirect("/admin/paslon");
      }
    });
  } else {
    res.redirect("/admin/paslon");
  }
});

Router.post("/tambah", upload.single("gambarPaslon"), (req, res) => {
  const { nameKetua, nameWaketu } = req.body;
  const insertData = {
    ketua: nameKetua,
    wakil: nameWaketu,
    img: {
      data: fs.readFileSync(path.join(uploadDir, req.file.filename)),
      contentType: req.file.mimetype,
    },
  };

  Paslon.findOne({ ketua: nameKetua, wakil: nameWaketu }).then(async (PLon) => {
    if (!PLon) {
      await Paslon.create(insertData);
      req.flash("success", "Paslon baru berhasil ditambahkan, silahkan login");
      res.redirect("/admin/paslon");
    } else {
      req.flash("error", "Paslon sudah terdaftar !");
      res.redirect("/admin/paslon/tambah");
    }
  });
});

Router.post("/ubah/:_id", (req, res) => {
  const { _id } = req.params;

  if (ObjectID.isValid(_id) === true) {
    Paslon.findById(_id).then((data) => {
      if (data) {
        Paslon.findById(data._id)
          .lean()
          .exec()
          .then((realData) => {
            const request = {
              ketua: req.body.nameKetua,
              wakil: req.body.nameWaketu,
            };
            const filter = { ketua: realData.ketua, wakil: realData.wakil };

            if (JSON.stringify(filter) !== JSON.stringify(request)) {
            } else {
              req.flash("error", "Data yang diubah tidak boleh sama !");
              res.redirect(`/admin/paslon/ubah/${_id}`);
            }
          });
      } else {
        res.redirect("/admin/paslon");
      }
    });
  } else {
    res.redirect("/admin/paslon");
  }
});

module.exports = Router;
