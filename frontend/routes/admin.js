"use strict";

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");
const standardAuthentication = require("../auth/standardauthentication.js");
const authorization = require("../auth/authorization.js");
const standardAuth = standardAuthentication.standardAuthentication;

router.use((req, res, next) => {
    req.app.set("views", "./views/admin/pages");
    next();
});
router.get("/", authorization.simpleAuthorization("Admin"), (req, res) => {
    adminController.viewHome(req, res);
});

router.get("/adminlogin", (req, res) => {
    res.render("admin_login.ejs");
});

router.post("/adminlogin", standardAuth.authenticateLoginAdmin);

router.get("/admin", authorization.simpleAuthorization("Admin"), (req, res) => {
    res.render("front.ejs");
});

router.get(
    "/cities",
    authorization.simpleAuthorization("Admin"),
    (req, res) => {
        adminController.allCities(req, res, 123);
    },
);

router.get(
    "/customers",
    authorization.simpleAuthorization("Admin"),
    (req, res) => {
        adminController.allCustomers(req, res, 123);
    },
);

router.get("/bikes", authorization.simpleAuthorization("Admin"), (req, res) => {
    adminController.allBikes(req, res, 123);
});

router.get(
    "/stations",
    authorization.simpleAuthorization("Admin"),
    (req, res) => {
        res.render("stations.ejs");
    },
);

router.get(
    "/parkingzones",
    authorization.simpleAuthorization("Admin"),
    (req, res) => {
        res.render("parkingzones.ejs");
    },
);

router.get(
    "/overview",
    authorization.simpleAuthorization("Admin"),
    (req, res) => {
        res.render("overview.ejs");
    },
);

module.exports = router;
