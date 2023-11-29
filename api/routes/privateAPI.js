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

module.exports = router;
