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
          sessID: req.sessionID,
          token,
        },
      });
    });
  })(req, res, next);
});

module.exports = Router;
