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
    authorization.simpleAuthorization("User"),
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

router.get("/user", authorization.simpleAuthorization("User"), (req, res) => {
    userController.specificUser(req, res, "alice_jones", 123);
});

<<<<<<< HEAD
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
=======
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
>>>>>>> c9afd0d58a446e077545a86b5f5e238665bc356f
});

module.exports = router;
