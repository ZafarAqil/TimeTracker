const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const employeeRoutes = require("./routes/employee");
const managerRoutes = require("./routes/manager");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/manager", managerRoutes);
app.use(employeeRoutes);
app.use(authRoutes);

app.listen(3000, () => {
  console.log("connected!");
});