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

router.get("/mobile", (req, res) => {
    res.render("front.ejs");
});

router.get("/rent", (req, res) => {
    res.render("rent.ejs");
});

router.get("/returnbike", (req, res) => {
    res.render("returnbike.ejs");
});

router.get("/parking", (req, res) => {
    res.render("parking.ejs");
});

router.get("/freebikes", (req, res) => {
    res.render("freebikes.ejs");
});

router.get("/mobilelogin", (req, res) => {
    res.render("mobile_login.ejs");
});

module.exports = router;
