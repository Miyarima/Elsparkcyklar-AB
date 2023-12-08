"use strict";

const express = require("express");
const router = express.Router();
const privateApiController = require("../controllers/privateApiController.js");
const bikeApiController = require("../controllers/bikeApiController.js");
const cityApiController = require("../controllers/cityApiController.js");
const userApiController = require("../controllers/userApiController.js");

router.get("/", (req, res) => {
    privateApiController.getAllRoutes(req, res);
});

/* ########################################### */
/* #################  BIKES  ################# */
/* ########################################### */

// Returns all bikes
router.get("/bikes", (req, res) => {
    bikeApiController.getAllBikes(req, res);
});

// Rents a bike
router.put("/bike/:id/rent", (req, res) => {
    bikeApiController.rentBike(req, res);
});

// Returnes rented bike
router.put("/bike/:id/returned", (req, res) => {
    bikeApiController.returnBike(req, res);
});

// Retuns position of given bike
router.get("/bike/:id/position", (req, res) => {
    bikeApiController.getBikePosition(req, res);
});

// Set bike position first time
router.post("/bike/:id/position", (req, res) => {
    bikeApiController.setBikePosition(req, res);
});

// Update a bike which already got a position
router.put("/bike/:id/position", (req, res) => {
    bikeApiController.updateBikePosition(req, res);
});

// Get all information about a specific bike
router.get("/bike/:id", (req, res) => {
    bikeApiController.getSpecificBike(req, res);
});

// Turn of specific bike
router.put("/bike/:id", (req, res) => {
    bikeApiController.turnOffSpecificBike(req, res);
});

// Delete specific bike
router.delete("/bike/:id", (req, res) => {
    bikeApiController.deleteSpecificBike(req, res);
});

/* ########################################### */
/* #################  USER  ################## */
/* ########################################### */

router.get("/users", (req, res) => {
    userApiController.getAllUsers(req, res);
});

router.post("/user", (req, res) => {
    userApiController.addUser(req, res);
});

router.get("/user/:id", (req, res) => {
    userApiController.getSpecificUser(req, res);
});

router.put("/user/:id", (req, res) => {
    userApiController.updateSpecificUser(req, res);
});

router.get("/user/:id/travel", (req, res) => {
    userApiController.getTravelUser(req, res);
});

/* ########################################### */
/* ################  CITIES   ################ */
/* ########################################### */

// Returns all cities
router.get("/cities", (req, res) => {
    cityApiController.getAllCities(req, res);
});

// Adds new city
router.post("/city", (req, res) => {
    cityApiController.addNewCity(req, res);
});

// Returns specific city
router.get("/city/:id", (req, res) => {
    cityApiController.getSpecificCity(req, res);
});

// Returns all bikes within a specific city
router.get("/city/:city/bike", (req, res) => {
    cityApiController.getBikesCity(req, res);
});

// Returns zones, bikes and charging statioins in specific city
router.get("/city/:id/zone", (req, res) => {
    cityApiController.getCityZone(req, res);
});

// Add a number of bikes to specific city
router.post("/city/:id/bike/:nr", (req, res) => {
    cityApiController.addNumberBikes(req, res);
});

// Update a number of bikes from specific city
router.put("/city/:id/bike/:nr", (req, res) => {
    cityApiController.updateNumberBikes(req, res);
});

// Remove a number of bikes from specific city
router.delete("/city/:id/bike/:nr", (req, res) => {
    cityApiController.deleteNumberBikes(req, res);
});

// Returns all availbel ports on a station
router.get("/city/zone/:id/ports", (req, res) => {
    cityApiController.getCityChargingStation(req, res);
});

module.exports = router;
