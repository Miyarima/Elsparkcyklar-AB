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

router.get("/adminlogin", (req, res) => {
    res.render("admin_login.ejs");
});

router.get("/admin", (req, res) => {
    res.render("front.ejs");
});

router.get("/cities", (req, res) => {
    res.render("cities.ejs");
});

router.get("/customers", (req, res) => {
    res.render("customers.ejs");
});

router.get("/bikes", (req, res) => {
    res.render("bikes.ejs");
});

router.get("/stations", (req, res) => {
    res.render("stations.ejs");
});

router.get("/parkingzones", (req, res) => {
    res.render("parkingzones.ejs");
});

router.get("/overview", (req, res) => {
    res.render("overview.ejs");
});

module.exports = router;
