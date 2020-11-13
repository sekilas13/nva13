const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Router = express.Router();

require("dotenv").config();

Router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: info });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        user: {
          role: user.role,
          id: user.id,
          email: user.email,
          username: user.username,
          sessID: req.sessionID,
          token,
        },
      });
    });
  })(req, res, next);
});

Router.delete("/logout", (req, res, next) => {
  if (req.isAuthenticated()) {
    req.session.destroy();
    req.logOut();
    res.json({ success: true, message: "Anda berhasil logout" });
  } else {
    res.json({ success: false, message: "Anda tidak diautentikasi" });
  }
});

Router.post("/session", (req, res) => {
  const sessPass = req.session.passport;
  const { checking, exist } = req.body;

  if (checking) {
    if (sessPass) {
      res.json({ isExist: true });
    } else {
      res.json({ isExist: false });
      req.logOut();
    }
  } else {
    if (exist) {
      const { _id: id, email, username, role } = req.user;
      const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ id, email, username, role, token });
    }
  }
});

module.exports = Router;
