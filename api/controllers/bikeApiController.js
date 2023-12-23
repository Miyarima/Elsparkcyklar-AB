"use strict";

// const db = require("../db/databaseFunctions.js");
const db = require("../db/sql.js");
const dbCreate = require("../db/functionsForAllTables.js");

const getAllBikes = async (req, res) => {
    const apiKey = req.query.apiKey;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    const bikes = await db.gatheredBikeFunctions.getAllBikes();

    return res.status(200).json({
        bikes: bikes,
    });
};

//
// USED FOR TESTS - DUMMY CODE
//
const dummyTest = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;
    const contentType = req.headers["content-type"];
    const { user } = req.body;

    // Check for apiKey provided
    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    // Check for the required headers
    if (!contentType || contentType !== "application/json") {
        return res
            .status(400)
            .json({ error: "Content-Type must be application/json" });
    }

    // Check for the required body content
    if (!req.body || Object.keys(req.body).length === 0) {
        return res
            .status(400)
            .json({ error: "Request body is missing or empty" });
    }

    // checking if a user was provided in the body
    if (!user) {
        return res
            .status(400)
            .json({ error: "No user to rent the bike was provided" });
    }

    // If the provided bikeId didn't exsist in the database
    if (!bikeId) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    return res.status(200).json({
        message: "bike has been rented",
    });
};

const rentBike = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;
    const userId = req.params.userid;
    const contentType = req.headers["content-type"];

    // Check for apiKey
    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    // Check for the required headers
    if (!contentType || contentType !== "application/json") {
        return res
            .status(400)
            .json({ error: "Content-Type must be application/json" });
    }

    // checking if a user was provided in the body
    if (!userId) {
        return res
            .status(403)
            .json({ error: "No user to rent the bike was provided" });
    }

    // If the provided bikeId didn't exsist in the database
    if (!bikeId) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    const rent = await db.gatheredBikeFunctions.unlockBike(bikeId, userId);

    return res.status(200).json({
        message: "bike has been rented",
        status: rent,
    });
};

const returnBike = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!bikeId) {
        console.log("NO BIKE ID GIVEN!");
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    if (!longitude) {
        console.log("No coordinates for Longitude given!");
        return res.status(403).json({
            error: "Please provide a coordinate for longitude for a bike.",
        });
    }

    if (!latitude) {
        console.log("No coordinates for Latitude given!");
        return res.status(403).json({
            error: "Please provide a coordinate for latitude for a bike.",
        });
    }

    const bike = await db.gatheredBikeFunctions.lockBike(
        bikeId,
        longitude,
        latitude,
    );

    return res.status(200).json({
        message: "bike has been returned",
        status: bike,
    });
};

const getBikePosition = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!bikeId) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    const bike = await db.gatheredBikeFunctions.getOneBike(bikeId);
    const longitude = bike[0].longitude;
    const latitude = bike[0].latitude;

    return res.status(200).json({
        longitude: longitude,
        latitude: latitude,
    });
};

const updateBikePosition = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;
    const contentType = req.headers["content-type"];
    const { longitude, latitude } = req.body;

    // Check for apiKey provided
    if (!apiKey) {
        console.log("NO API KEY!");
        return res.status(403).json({ error: "Please provide an API key." });
    }

    // Check for the required headers
    if (!contentType || contentType !== "application/json") {
        return res
            .status(400)
            .json({ error: "Content-Type must be application/json" });
    }

    // Check for the required body content
    if (!req.body || Object.keys(req.body).length === 0) {
        return res
            .status(400)
            .json({ error: "Request body is missing or empty" });
    }

    if (!longitude) {
        return res.status(403).json({
            error: "Coordinates are needed for the city (longitude)",
        });
    }

    if (!latitude) {
        return res.status(403).json({
            error: "Coordinates are needed for the city (latitude)",
        });
    }

    // If the provided bikeId didn't exsist in the database
    if (!bikeId) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    const update = {
        table: "Bike",
        id: bikeId,
        longitude: longitude,
        latitude: latitude,
    };

    await dbCreate.functionsForAllTables.oneRowUpdateTable(update);

    return res.status(200).json({
        message: "updated position of bike",
    });
};

const getSpecificBike = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!bikeId) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    const bike = await db.gatheredBikeFunctions.getOneBike(bikeId);

    return res.status(200).json({
        bike: bike,
    });
};

const turnOffSpecificBike = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!bikeId) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    const bike = await db.gatheredBikeFunctions.changePowerStatus(bikeId, 0);

    return res.status(200).json({
        message: "the bike has been turned off",
        status: bike,
    });
};

const deleteSpecificBike = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!bikeId) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    const deleted = await db.gatheredBikeFunctions.deleteBike(bikeId);

    return res.status(200).json({
        message: "the bike has been deleted",
        status: deleted,
    });
};

module.exports = {
    getAllBikes,
    rentBike,
    returnBike,
    getBikePosition,
    getSpecificBike,
    updateBikePosition,
    turnOffSpecificBike,
    deleteSpecificBike,
    dummyTest,
};
