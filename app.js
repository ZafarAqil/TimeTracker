const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// const csrf = require("csurf");
// const flash = require("connect-flash");

const errorController = require("./controllers/error");
const User = require("./models/user");

// const MONGODB_URI = process.env.MONGODB_URI;

const MONGODB_URI =
  "mongodb+srv://zafar:G3dXiTm7I6VHkBnT@cluster0-qcipy.mongodb.net/timetracker?retryWrites=true&w=majority";

const app = express();
const port = process.env.PORT || 3000;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", "views");

const employeeRoutes = require("./routes/employee");
// const managerRoutes = require("./routes/manager");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// app.use("/manager", managerRoutes);
app.use(employeeRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(result => {
    app.listen(port, () => {
      console.log("connected!");
    });
  })
  .catch(err => {
    console.log(err);
  });
