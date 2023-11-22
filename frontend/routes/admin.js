"use strict";

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");

router.use((req, res, next) => {
    req.app.set("views", "./views/admin/pages");
    next();
});

router.get("/", (req, res) => {
    adminController.viewHome(req, res);
});

module.exports = router;
