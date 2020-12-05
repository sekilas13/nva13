const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const socketIO = require("socket.io");
const noCache = require("nocache");
const express = require("express");
const http = require("http");
const path = require("path");

const app = express();

const { fullUrl } = require("./utils");
const nm_dir = path.join(__dirname, "node_modules");
const pub_dir = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(pub_dir));

app.use(noCache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(pub_dir, "favicon.ico")));
app.use("/bs", express.static(path.join(nm_dir, "bootstrap/dist")));

app.get("/", (req, res) =>
  res.render("pages/landingPage", {
    cannonical: fullUrl(req),
    title: "Pilih Paslon Mu | NVA13",
  })
);

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(
    ` [server.js] : Listening on port ${PORT} | http://localhost:${PORT}`
  )
);

const Sock = socketIO(server);
