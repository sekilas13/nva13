const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const cookie = require("cookie");
const { admin: adminStore } = require("./store");

const app = express();

require("dotenv").config();

const component = path.resolve("components/client");
const production = process.env.NODE_ENV === "production";

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

app.get("*", (req, res) =>
  !production
    ? res.redirect("http://localhost:4000")
    : res.sendFile(path.join(component, "index.html"))
);

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
  s.on("new user", (d) => {
    const c = cookie.parse(s.handshake.headers.cookie);
    adminStore.get(c.session_admiin, (err, data) => {
      if (!data) s.disconnect();
      s.broadcast.emit("admin:new user", d);
    });
  });
});
