"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.use((req, res, next) => {
    req.app.set("views", "./views/user/pages");
    next();
});

router.get("/", (req, res) => {
    userController.viewHome(req, res);
});

module.exports = router;
