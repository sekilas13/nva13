const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const noCache = require("nocache");
const express = require("express");
const http = require("http");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(noCache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello World"));

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(
    ` [server.js] : Listening on port ${PORT} | http://localhost:${PORT}`
  )
);

const Sock = socketIO(server);
