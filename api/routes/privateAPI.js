"use strict";

const express = require("express");
const router = express.Router();
const privateApiController = require("../controllers/privateApiController.js");

router.get("/", (req, res) => {
    privateApiController.getAllRoutes(req, res);
});

router.get("/bikes", (req, res) => {
    privateApiController.getAllBikes(req, res);
});

router.put("/bike/:id/rent", (req, res) => {
    privateApiController.rentBike(req, res);
});

router.post("/bike/:id/returned", (req, res) => {
    privateApiController.returnBike(req, res);
});

router.get("/bike/:id/position", (req, res) => {
    privateApiController.getBikePosition(req, res);
});

router.post("/bike/:id/position", (req, res) => {
    privateApiController.setBikePosition(req, res);
});

router.get("/bike/:id", (req, res) => {
    privateApiController.getSpecificBike(req, res);
});

module.exports = router;
