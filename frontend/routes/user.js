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

router.get("/userlogin", (req, res) => {
    res.render("user_login.ejs");
});

router.get("/createuser", (req, res) => {
    res.render("create_user.ejs");
});

router.get("/user", (req, res) => {
    res.render("front.ejs");
});

router.get("/details", (req, res) => {
    res.render("details.ejs");
});

router.get("/detailsedit", (req, res) => {
    res.render("details_edit.ejs");
});

router.get("/history", (req, res) => {
    res.render("history.ejs");
});

router.get("/wallet", (req, res) => {
    res.render("wallet.ejs");
});

router.get("/prepaid", (req, res) => {
    res.render("wallet_prepaid.ejs");
});

router.get("/autogiro", (req, res) => {
    res.render("wallet_autogiro.ejs");
});

module.exports = router;
