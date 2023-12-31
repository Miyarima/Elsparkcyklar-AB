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

    try {
        // Check for apiKey
        if (!apiKey) {
            return res
                .status(403)
                .json({ error: "Please provide an API key." });
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
    } catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
};

const returnBike = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;

    try {
        if (!apiKey) {
            return res
                .status(403)
                .json({ error: "Please provide an API key." });
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
    } catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
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

const updateBikeStation = async (req, res) => {
    const apiKey = req.query.apiKey;
    const contentType = req.headers["content-type"];

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

    try {
        const { bikeId, longitude, latitude, zoneId, stationId, api_key } =
            req.body;

        const update = {
            table: "Bike",
            id: bikeId,
            longitude: longitude,
            latitude: latitude,
        };

        if (bikeId) update.id = bikeId;
        if (longitude) update.longitude = longitude;
        if (latitude) update.latitude = latitude;
        if (zoneId) update.zone_id = zoneId;
        if (stationId) update.station_id = stationId;
        if (api_key) update.api_key = api_key;

        await dbCreate.functionsForAllTables.oneRowUpdateTable(update);

        return res.status(200).json({
            message: "The user has been updated",
        });
    } catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
};

const updateBikePosition = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;
    const contentType = req.headers["content-type"];
    // const { longitude, latitude } = req.body;

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

    try {
        const { longitude, latitude, speed, battery } = req.body;

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

        if (speed) update.speed = speed;
        if (battery) update.battery = battery;

        await dbCreate.functionsForAllTables.oneRowUpdateTable(update);

        return res.status(200).json({
            message: "The bike has been updated",
        });
    } catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
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

const getBikesWithStatus = async (req, res) => {
    const apiKey = req.query.apiKey;
    const status = req.params.status;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!status) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }
    try {
        const bikes =
            await db.gatheredBikeFunctions.selectBikesFromStatus(status);
        return res.status(200).json({
            bikes: bikes,
        });
    } catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
};

const getTravelStatusForUser = async (req, res) => {
    const apiKey = req.query.apiKey;
    const userId = req.params.id;
    const status = req.params.status;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!userId) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a user." });
    }

    if (!status) {
        return res
            .status(403)
            .json({ error: "Please provide correct status." });
    }
    try {
        const statusQuery = await db.gatheredBikeFunctions.getUserTravelStatus(
            userId,
            status,
        );
        return res.status(200).json({
            status: statusQuery,
        });
    } catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
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
    updateBikeStation,
    getBikesWithStatus,
    getTravelStatusForUser,
};
