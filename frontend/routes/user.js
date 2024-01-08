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

router.get(
    "/",
    authorization.simpleAuthorization("User", "/user/userlogin"),
    userController.viewHome,
);

router.get("/userlogin", (req, res) => {
    res.render("user_login.ejs");
});

router.post("/userlogin", standardAuth.authenticateLoginUser);

router.get("/createuser", (req, res) => {
    res.render("create_user.ejs");
});

router.post("/createuser", standardAuth.insertUser);

// Declare the redirect route
router.get("/authenticate", gitAuth.getAccessToken);

router.get("/gitsignup", (req, res) => {
    res.render("gitsignup.ejs");
});

router.post("/gitsignup", gitAuth.gitSignup);

router.get("/user", authorization.simpleAuthorization("User", "/user/userlogin"), (req, res) => {
    userController.specificUser(req, res, req.session.username);
});

router.get(
    "/details",
    authorization.simpleAuthorization("User", "/user/userlogin"),
    async (req, res) => {
        const users = await userController.detailsSpecificUser(req, res, req.session.username);
        res.render("details.ejs", { users });
    }
);

router.get(
    "/detailsedit",
    authorization.simpleAuthorization("User", "/user/userlogin"),
    async (req, res) => {
        const users = await userController.detailsSpecificUser(req, res, req.session.username);
        res.render("details_edit.ejs", { users });
    }
);

router.post("/detailsedit", async (req, res) => {
    await userController.updateEmailAddress(req, res, req.body.id, req.body.email);
    res.redirect("details");
});

router.get(
    "/history",
    authorization.simpleAuthorization("User", "/user/userlogin"),
    async (req, res) => {
        const users = await userController.getUserHistory(req, res, req.session.username);
        res.render("history.ejs", { users });
    }
);

router.get("/wallet", authorization.simpleAuthorization("User", "/user/userlogin"),
    (req, res) => {
        res.render("wallet.ejs");
    }
);

router.get(
    "/prepaid",
    authorization.simpleAuthorization("User", "/user/userlogin"),
    (req, res) => {
        res.render("wallet_prepaid.ejs");
    },
);

router.post("/prepaid", async (req, res) => {
    await userController.updateUserWallet(req, res, req.session.username, req.body.amount);
    res.redirect("details");
});

router.get(
    "/autogiro",
    authorization.simpleAuthorization("User", "/user/userlogin"),
    (req, res) => {
        res.render("wallet_autogiro.ejs");
    },
);

router.post("/autogiro", async (req, res) => {
    await userController.deductUserWallet(req, res, req.session.username, req.body.amount);
    res.redirect("details");
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("userlogin");
});

module.exports = router;
