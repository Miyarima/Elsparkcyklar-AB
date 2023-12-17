"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const gitAuthentication = require("../auth/gitauth.js");
const standardAuthentication = require("../auth/standardauth.js");
const gitAuth = gitAuthentication.gitAuthOB;
const standardAuth = standardAuthentication.standardAuth;
//router.use(cookieParser());

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

router.post("/createuser", (req, res) => {
    standardAuth.insertUser(req, res);
});

// Declare the redirect route
router.get("/authenticate", (req, res) => {
    gitAuth.getAccessToken(req, res);
});

router.get("/gitsignup", (req, res) => {
    res.render("gitsignup.ejs");
});

router.post("/gitsignup", (req, res) => {
    gitAuth.gitSignup(req, res);
});

router.get("/user", standardAuth.simpleAuthorization("User"), (req, res) => {
    res.render("front.ejs");
});

router.get("/details", standardAuth.simpleAuthorization("User"), (req, res) => {
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
