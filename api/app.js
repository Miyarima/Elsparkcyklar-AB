"use strict";

const privateAPI = require("./routes/privateAPI.js");

const express = require("express");
const path = require("path");
const app = express();
// const port = 8080;

// eslint-disable-next-line
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", privateAPI);

// app.listen(port, () => {
//     console.log(`starting a server on the port:${port}`);
// });

module.exports = app;
