const path = require("path");
const mongoose = require("mongoose");
const inquirer = require("inquirer");

require("dotenv").config({ path: path.resolve("../server/.env") });

(async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log(`Error : ${err}`);
      process.exit(22);
    });

  inquirer
    .prompt([
      {
        name: "email",
        type: "input",
        message: "Masukkan Email :",
        validate: (text) => {
          if (text) {
            const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(text);
            if (valid) return true;
            console.log("\nFormat email tidak valid !");
            return false;
          } else {
            console.log("Email harus diisi !");
            return false;
          }
        },
      },
      {
        name: "username",
        type: "input",
        message: "Masukkan nama pengguna :",
        validate: (text) => {
          if (text) {
            if (text.length < 6) {
              console.log("\nPanjang minimal nama pengguna harus 6 karakter");
              return false;
            } else {
              const valid = /^[a-zA-Z\s\-]+$/.test(text);
              if (valid) return true;
              console.log(
                "\nNama pengguna hanya boleh huruf, spasi, atau tanda hubung !"
              );
              return false;
            }
          } else {
            console.log("Nama pengguna harus diisi !");
            return false;
          }
        },
      },
      {
        name: "role",
        type: "list",
        message: "Pilih user access :",
        choices: ["admin", "guru", "siswa"],
      },
      {
        name: "password",
        type: "password",
        message: "Masukkan kata sandi :",
        validate: (pw) => {
          if (pw) {
            if (pw.length < 6) {
              console.log("Panjang minimal password harus 6 karakter");
              return false;
            }
            return true;
          } else {
            console.log("Kata sandi harus diisi !");
            return false;
          }
        },
      },
    ])
    .then((u) => {
      console.log(u);
      process.exit();
    });
})();
