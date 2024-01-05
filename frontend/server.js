"use strict";

const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/user.js");
const mobileRoutes = require("./routes/mobile.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

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
app.use(bodyParser.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/mobile", mobileRoutes);

app.use((req, res, next) => {
    if (req.url.endsWith(".js")) {
        res.type("application/javascript");
    }
    next();
});

app.post("/admin/update-map", (req, res) => {
    const { coordinates } = req.body;

    if (coordinates) {
        res.status(200).send("Coordinates received");
        io.emit("updateCoordinates", coordinates);
    } else {
        res.status(400).send("Invalid coordinates");
    }
});

app.post("/admin/update-map-static", (req, res) => {
    const { staticCoordinates } = req.body;

    if (staticCoordinates) {
        res.status(200).send("Coordinates received");
        io.emit("updateStaticCoordinates", staticCoordinates);
    } else {
        res.status(400).send("Invalid coordinates");
    }
});

const server = app.listen(port, () => {
    console.log(`starting a server on the port:${port}`);
});

const io = require("socket.io")(server);
