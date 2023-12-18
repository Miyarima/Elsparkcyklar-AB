"use strict";

const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/user.js");
const mobileRoutes = require("./routes/mobile.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const express = require("express");
const path = require("path");
const app = express();
const port = 1337;

app.set("view engine", "ejs");

// eslint-disable-next-line
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "cool_secret",
        resave: false,
        saveUninitialized: true,
    }),
);
app.use(cookieParser());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/mobile", mobileRoutes);

app.listen(port, () => {
    console.log(`starting a server on the port:${port}`);
});
