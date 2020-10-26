const bcrypt = require("bcrypt");
const { userAdmin } = require("../models");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userAdmin.findById(id, (err, user) => {
    done(err, user);
  });
});

// Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    userAdmin
      .findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, {
            message: "Akun tidak terdaftar !",
            type: "ACC_404",
          });
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Kata sandi salah !",
                type: "PASS_ERR",
              });
            }
          });
        }
      })
      .catch((err) => {
        return done(null, false, { message: err });
      });
  })
);

module.exports = passport;
