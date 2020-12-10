const methodOverride = require("method-override");
const session = require("express-session");
const compression = require("compression");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const flash = require("express-flash");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const passport = require("passport");
const noCache = require("nocache");
const express = require("express");
const helmet = require("helmet");
const http = require("http");
const path = require("path");
const MongoStore = require("connect-mongo")(session);

const app = express();
require("dotenv").config();

const { main, admin, vote } = require("./routes");
const Local = require("./passport/local");

const nm_dir = path.join(__dirname, "node_modules");
const pub_dir = path.join(__dirname, "public");
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

app.use(compression());
app.use(helmet());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(pub_dir));

app.use(noCache());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(pub_dir, "favicon.ico")));
app.use("/bs", express.static(path.join(nm_dir, "bootstrap")));
app.use("/jq", express.static(path.join(nm_dir, "jquery")));
app.use("/validator", express.static(path.join(nm_dir, "jquery-validation")));
app.use("/swal", express.static(path.join(nm_dir, "sweetalert2")));
app.use("/chart", express.static(path.join(nm_dir, "chart.js")));

app.use(passport.initialize());
app.use(passport.session());

Local(passport);

app.use(methodOverride("_method"));

app.get("/", main);
app.use("/admin", admin);
app.use("/vote", vote);

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(
    ` [server.js] : Listening on port ${PORT} | http://localhost:${PORT}`
  )
);

const Sock = socketIO(server);

Sock.on("connection", (socc) => {
  socc.on("vote", ({ _id }) => socc.broadcast.emit("admin:upvote", { _id }));
});
