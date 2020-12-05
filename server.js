const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const socketIO = require("socket.io");
const noCache = require("nocache");
const express = require("express");
const http = require("http");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(noCache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, "public/favicon.ico")));

app.get("/", (req, res) => res.send("Hello World"));

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(
    ` [server.js] : Listening on port ${PORT} | http://localhost:${PORT}`
  )
);

const Sock = socketIO(server);
