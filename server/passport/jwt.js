const Strategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { User } = require("../models");

require("dotenv").config();
module.exports = (passport) =>
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (payload, done) => {
        return User.findById(payload.id)
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => done(err));
      }
    )
  );
