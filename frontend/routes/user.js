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
    userController.specificUser(req, res, "alice_jones", 123);
});

router.get("/details", standardAuth.simpleAuthorization("User"), async (req, res) => {
    const users = await userController.detailsSpecificUser(req, res, "alice_jones", 123);
    res.render("details.ejs", { users });
});

router.get("/detailsedit", async (req, res) => {
    const users = await userController.detailsSpecificUser(req, res, "alice_jones", 123);
    res.render("details_edit.ejs", { users });
});

router.post("/detailsedit", async (req, res) => {
    //console.log(JSON.stringify(req.body, null, 4));
    await userController.updateEmailAddress(req, res, req.body.id, req.body.email, 123);
    res.redirect("details");
});

router.get("/history", async (req, res) => {
    const users = await userController.getUserHistory(req, res, "alice_jones", 123);
    res.render("history.ejs", { users });
});

router.get("/wallet", (req, res) => {
    res.render("wallet.ejs");
});

router.post("/prepaid", async (req, res) => {
    await userController.updateUserWallet(req, res, req.body.userId, req.body.amount, 123);
    res.redirect("details");
});

router.post("/prepaid", async (req, res) => {
    await userController.updateUserWallet(req, res, req.body.userId, req.body.amount, 123);
    res.redirect("details");
});

router.get("/prepaid", (req, res) => {
    res.render("wallet_prepaid.ejs");
});

router.get("/autogiro", (req, res) => {
    res.render("wallet_autogiro.ejs");
});

module.exports = router;
