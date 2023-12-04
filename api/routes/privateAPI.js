"use strict";

const express = require("express");
const router = express.Router();
const privateApiController = require("../controllers/privateApiController.js");

router.get("/", (req, res) => {
    privateApiController.getAllRoutes(req, res);
});

// Returns all bikes
router.get("/bikes", (req, res) => {
    privateApiController.getAllBikes(req, res);
});

// Rents a bike
router.put("/bike/:id/rent", (req, res) => {
    privateApiController.rentBike(req, res);
});

// Returnes rented bike
router.put("/bike/:id/returned", (req, res) => {
    privateApiController.returnBike(req, res);
});

// Retuns position of given bike
router.get("/bike/:id/position", (req, res) => {
    privateApiController.getBikePosition(req, res);
});

// Set bike position first time
router.post("/bike/:id/position", (req, res) => {
    privateApiController.setBikePosition(req, res);
});

// Update a bike which already got a position
router.put("/bike/:id/position", (req, res) => {
    privateApiController.updateBikePosition(req, res);
});

// Get all information about a specific bike
router.get("/bike/:id", (req, res) => {
    privateApiController.getSpecificBike(req, res);
});

// Turn of specific bike
router.put("/bike/:id", (req, res) => {
    privateApiController.turnOffSpecificBike(req, res);
});

// Delete specific bike
router.delete("/bike/:id", (req, res) => {
    privateApiController.deleteSpecificBike(req, res);
});

/* ########################################### */
/* #################  USER   ################# */
/* ########################################### */

router.get("/users", (req, res) => {
    privateApiController.getAllUsers(req, res);
});

router.get("/user/:id/travel", (req, res) => {
    privateApiController.getTravelUser(req, res);
});

/* ########################################### */
/* ################  CITIES   ################ */
/* ########################################### */

// Returns all cities
router.get("/cities", (req, res) => {
    privateApiController.getAllCities(req, res);
});

// Adds new city
router.post("/city/:name", (req, res) => {
    privateApiController.addNewCity(req, res);
});

// Returns specific city
router.get("/city/:id", (req, res) => {
    privateApiController.getSpecificCity(req, res);
});

// Returns all bikes within a specific city
router.get("/city/:id/bike", (req, res) => {
    privateApiController.getBikesCity(req, res);
});

// Returns zones, bikes and charging statioins in specific city
router.get("/city/:id/zone", (req, res) => {
    privateApiController.getCityZone(req, res);
});

// Add a number of bikes to specific city
router.post("/city/:id/bike/:nr", (req, res) => {
    privateApiController.addNumberBikes(req, res);
});

// Update a number of bikes from specific city
router.put("/city/:id/bike/:nr", (req, res) => {
    privateApiController.updateNumberBikes(req, res);
});

// Remove a number of bikes from specific city
router.delete("/city/:id/bike/:nr", (req, res) => {
    privateApiController.deleteNumberBikes(req, res);
});

router.get("/city/:id/zone/:zoneid/:chargingid", (req, res) => {
    privateApiController.getCityChargingStation(req, res);
});

module.exports = router;
