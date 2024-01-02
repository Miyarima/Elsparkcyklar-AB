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
    async (req, res) => {
        const cities = await adminController.allCities(req, res);
        res.render("cities.ejs", { cities });
    },
);

router.get(
    "/customers",
    authorization.simpleAuthorization("Admin"),
    async (req, res) => {
        const users = await adminController.allCustomers(req, res);
        res.render("customers.ejs", { users });
    },
);

router.get(
    "/customeredit/:id",
    authorization.simpleAuthorization("Admin"),
    async (req, res) => {
        const users = await adminController.specificUser(req, res, req.params.id);
        res.render("customer_edit.ejs", { users });
    },
);

router.post("/customeredit", async (req, res) => {
    await adminController.updateAccount(req, res, req.body.id, req.body.password, req.body.email);
    res.redirect("customers");
});

router.get("/bikes", authorization.simpleAuthorization("Admin"), 
    async (req, res) => {
        const bikes = await adminController.allBikes(req, res);
        res.render("bikes.ejs", { bikes });
    });

router.get(
    "/stations",
    authorization.simpleAuthorization("Admin"),
    async (req, res) => {
        const stations = await adminController.allStations(req, res);
        res.render("stations.ejs", { stations });
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

router.post("/updatebike", async (req, res) => {
    await adminController.updateStationBike(req, res, req.body.selectedBike, req.body.stationId);
    res.redirect("cities");
});

router.get(
    "/chosencity/:city",
    authorization.simpleAuthorization("Admin"),
    async (req, res) => {
        const chosen = await adminController.getSpecificCity(req, res, req.params.city);
        res.render("specific_city.ejs", chosen);
    },
);

module.exports = router;
