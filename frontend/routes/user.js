"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const gitAuthentication = require("../auth/gitauthentication.js");
const standardAuthentication = require("../auth/standardauthentication.js");
const authorization = require("../auth/authorization.js");
const gitAuth = gitAuthentication.gitAuthentication;
const standardAuth = standardAuthentication.standardAuthentication;
//router.use(cookieParser());

router.use((req, res, next) => {
    req.app.set("views", "./views/user/pages");
    next();
});

router.get("/", authorization.simpleAuthorization("User"), (req, res) => {
    userController.viewHome(req, res);
});

router.get("/userlogin", (req, res) => {
    res.render("user_login.ejs");
});

router.post("/userlogin", (req, res) => {
    console.log(req.body);
    standardAuth.authenticateLogin(req, res);
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

router.get("/user", authorization.simpleAuthorization("User"), (req, res) => {
    userController.specificUser(req, res, "alice_jones", 123);
});

router.get(
    "/details",
    authorization.simpleAuthorization("User"),
    (req, res) => {
        userController.detailsSpecificUser(req, res, "alice_jones", 123);
    },
);

router.get(
    "/detailsedit",
    authorization.simpleAuthorization("User"),
    (req, res) => {
        res.render("details_edit.ejs");
    },
);

router.get(
    "/history",
    authorization.simpleAuthorization("User"),
    (req, res) => {
        userController.getUserHistory(req, res, "alice_jones", 123);
    },
);

router.get("/wallet", authorization.simpleAuthorization("User"), (req, res) => {
    res.render("wallet.ejs");
});

router.get(
    "/prepaid",
    authorization.simpleAuthorization("User"),
    (req, res) => {
        res.render("wallet_prepaid.ejs");
    },
);

router.get(
    "/autogiro",
    authorization.simpleAuthorization("User"),
    (req, res) => {
        res.render("wallet_autogiro.ejs");
    },
);

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("userlogin");
});

module.exports = router;
