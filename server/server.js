const http = require("http");
const path = require("path");
const noCache = require("nocache");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoStore = require("connect-mongodb-session")(session);
const jwt = require("jsonwebtoken");

const app = express();

require("dotenv").config();

const component = path.resolve("components/client");
const production = process.env.NODE_ENV === "production";
const maxAge = 60 * 60 * 1000;

const { auth, admin } = require("./routes");
const { local: LocalStrategy, jwt: JWTStrategy } = require("./passport");

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

const store = new mongoStore({
  uri: process.env.MONGO_URL,
  collection: "sess_store",
});

app.use(noCache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    name: "se_ssion",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      maxAge,
      expires: new Date(Date.now() + maxAge),
      sameSite: "lax",
    },
  })
);

LocalStrategy(passport);
JWTStrategy(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(component));
app.get("/*", (req, res) =>
  !production
    ? res.redirect("http://localhost:4000")
    : res.sendFile(path.join(component, "index.html"))
);

app.use("/auth", auth);
app.use("/admin", passport.authorize("jwt"), admin);
// app.use("/siswa");

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(
    ` [server.js] : Listening on port ${PORT} | http://localhost:${PORT}`
  )
);

const Sock = socketIO(server);

Sock.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function (
      err,
      decoded
    ) {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (s) => {
  s.on("new user", (d) =>
    s.broadcast.emit("admin:new user", { ...d, type: "new login" })
  );

  s.on("logout user", (d) => {
    s.broadcast.emit("admin:logout user", { ...d, type: "logout" });
  });
});
