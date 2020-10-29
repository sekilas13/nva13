const path = require("path");
const mongoose = require("mongoose");
const inquirer = require("inquirer");
const bcrypt = require("bcrypt");
const pref = require("./preferences");

require("dotenv").config({ path: path.resolve("../server/.env") });

const User = require("./User");

inquirer
  .prompt(pref)
  .then((data) => {
    const { email, username, role, password } = data;
    return mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(async () => {
        console.log("MongoDB connected.....");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        return User.findOne({ email }).then(async (u) => {
          if (!u) {
            await User.create({ email, role, username, password: hash });
            return console.log("User berhasil ditambahkan");
          } else {
            return console.log("User sudah ada !");
          }
        });
      });
  })
  .then(() => process.exit());
