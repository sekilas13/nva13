const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");

const app = express();

require("dotenv").config();

const { admin } = require("./routes");

const PORT = process.env.PORT || 3000;
mongoose
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", admin);
// app.use("/siswa");

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(
    ` [server.js] : Listening on port ${PORT} | http://localhost:${PORT}`
  )
);

const Sock = socketIO(server);

Sock.on("connection", (s) => {
  s.on("new user", (d) => s.broadcast.emit("admin:new user", d));
});
