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

router.get(
    "/",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    (req, res) => {
        adminController.viewHome(req, res);
    },
);

router.get("/adminlogin", (req, res) => {
    res.render("admin_login.ejs");
});

router.post("/adminlogin", standardAuth.authenticateLoginAdmin);

router.get(
    "/admin",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    (req, res) => {
        res.render("front.ejs");
    },
);

router.get(
    "/cities",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    async (req, res) => {
        const cities = await adminController.allCities(req, res);
        res.render("cities.ejs", { cities });
    },
);

router.get(
    "/customers",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    async (req, res) => {
        const users = await adminController.allCustomers(req, res);
        res.render("customers.ejs", { users });
    },
);

router.get(
    "/customeredit/:id",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    async (req, res) => {
        const users = await adminController.specificUser(
            req,
            res,
            req.params.id,
        );
        res.render("customer_edit.ejs", { users });
    },
);

router.post("/customeredit", async (req, res) => {
    await adminController.updateAccount(
        req,
        res,
        req.body.id,
        req.body.password,
        req.body.email,
    );
    res.redirect("customers");
});

router.get(
    "/bikes",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    async (req, res) => {
        const bikes = await adminController.allBikes(req, res);
        res.render("bikes.ejs", { bikes });
    },
);

router.get(
    "/stations",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    async (req, res) => {
        const stations = await adminController.allStations(req, res);
        res.render("stations.ejs", { stations });
    },
);

router.get(
    "/parkingzones",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    (req, res) => {
        res.render("parkingzones.ejs");
    },
);

router.get(
    "/overview",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    async (req, res) => {
        const stations = await adminController.allStations(req, res, 123);
        const zones = await adminController.allZones(req, res, 123);
        const bikes = await adminController.allBikes(req, res, 123);

        let staticCoordinates = [];

        stations.forEach((station) => {
            staticCoordinates.push([
                station.latitude,
                station.longitude,
                station.type,
                10,
            ]);
        });

        zones.forEach((zone) => {
            let speed = "5-zone";

            if (zone.max_speed !== 5) {
                speed = zone.max_speed === 10 ? "10-zone" : "15-zone";
            }

            staticCoordinates.push([
                zone.latitude,
                zone.longitude,
                speed,
                zone.radius,
            ]);
        });

        let coordinates = [];
        bikes.forEach((bike) => {
            coordinates.push([bike.latitude, bike.longitude]);
        });

        res.render("map.ejs");

        setTimeout(function () {
            try {
                fetch("http://localhost:1337/admin/update-map", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ coordinates }),
                });
            } catch (error) {
                console.error("Error sending bike update", error);
                return null;
            }

            try {
                fetch("http://localhost:1337/admin/update-map-static", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ staticCoordinates }),
                });
            } catch (error) {
                console.error("Error sending static update", error);
                return null;
            }
        }, 1000);
    },
);

router.post("/updatebike", async (req, res) => {
    await adminController.updateStationBike(
        req,
        res,
        req.body.selectedBike,
        req.body.stationId,
    );
    res.redirect("cities");
});

router.get(
    "/chosencity/:city",
    authorization.simpleAuthorization("Admin", "/admin/adminlogin"),
    async (req, res) => {
        const chosen = await adminController.getSpecificCity(
            req,
            res,
            req.params.city,
        );
        res.render("specific_city.ejs", chosen);
    },
);

module.exports = router;
