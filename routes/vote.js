const express = require("express");
const Router = express.Router();

Router.post("/upvote", (req, res) => res.send("UPVOTE !"));
Router.get("/info", checkAuthenticated, (req, res) => res.send("Info paslon"));
Router.get("/chartInfo", checkAuthenticated, (req, res) =>
  res.send("Chart.js Label info")
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({ error: true, message: "Anda belum login" }).status(401);
}

module.exports = Router;
