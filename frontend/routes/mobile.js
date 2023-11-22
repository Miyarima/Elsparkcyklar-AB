"use strict";

const express = require("express");
const router = express.Router();
const mobileController = require("../controllers/mobileController.js");

router.use((req, res, next) => {
    req.app.set("views", "./views/mobile/pages");
    next();
});

router.get("/", (req, res) => {
    mobileController.viewHome(req, res);
});

module.exports = router;
