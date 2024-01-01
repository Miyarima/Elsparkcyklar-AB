"use strict";

// const db = require("../db/databaseFunctions.js");
const db = require("../db/sql.js");
const dbCreate = require("../db/functionsForAllTables.js");

// Get all information about the cities
const getAllCities = async (req, res) => {
    const apiKey = req.query.apiKey;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    const cities = await db.gatheredCityFunctions.selectAllCities();

    return res.status(200).json({
        cities: cities,
    });
};

// Get all information about the cities
const getAllZones = async (req, res) => {
    const apiKey = req.query.apiKey;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    const zones = await db.gatheredCityFunctions.selectAllZones();

    return res.status(200).json({
        zones: zones,
    });
};

// Get all charging stations in the system
const getAllStations = async (req, res) => {
    const apiKey = req.query.apiKey;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    const stations = await db.gatheredCityFunctions.selectAllStation();

    return res.status(200).json({
        stations: stations,
    });
};

// Inserts new city
const addNewCity = async (req, res) => {
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
        const { name, longitude, latitude } = req.body;

        if (!name) {
            return res
                .status(403)
                .json({ error: "A name for the city is needed" });
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

        const insert = {
            table: "City",
            name: name,
            longitude: longitude,
            latitude: latitude,
        };

        await dbCreate.functionsForAllTables.insertTable(insert);

        return res.status(200).json({
            message: "A new city has been created",
        });
    } catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
};

// Get all the information about a specific city
const getSpecificCity = async (req, res) => {
    const apiKey = req.query.apiKey;
    const cityId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!cityId) {
        return res.status(403).json({ error: "Missing id for the city!." });
    }

    const city = await db.gatheredCityFunctions.specificCity(cityId);

    return res.status(200).json({
        city: city,
    });
};

// Get bikes in specific city
const getBikesCity = async (req, res) => {
    const apiKey = req.query.apiKey;
    const city = req.params.city;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!city) {
        return res.status(403).json({ error: "Missing name for the city!." });
    }

    // ! ==================================================
    // ! = Detta är nog inte optimalt, kommer nog bli slöt
    // ! ==================================================

    const citiesAndBikes =
        await db.gatheredCityFunctions.allBikesAndItsCities();

    const allBikes = citiesAndBikes.filter((item) => item.name === city);

    return res.status(200).json({
        bikes: allBikes,
    });
};

// Get zones, bikes and charging station in specific city
const getCityZone = async (req, res) => {
    const apiKey = req.query.apiKey;
    const cityId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!cityId) {
        return res.status(403).json({ error: "Missing id for the city!." });
    }

    return res.status(200).json({
        bikes: cityId,
    });
};

// Get specific zone and charging station within zone
const getCityChargingStation = async (req, res) => {
    const apiKey = req.query.apiKey;
    const zoneId = req.params.zoneid;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!zoneId) {
        return res.status(403).json({ error: "Missing zoneId for the city!." });
    }

    const availablePorts =
        await db.gatheredCityFunctions.availablePortsForStation(zoneId);

    return res.status(200).json({
        ports: availablePorts,
    });
};

// Get specific zone and charging station within zone
const getBikeChargingOnStation = async (req, res) => {
    const apiKey = req.query.apiKey;
    const stationId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!stationId) {
        return res.status(403).json({ error: "Missing zoneId for the city!." });
    }

    const bikes =
        await db.gatheredCityFunctions.bikesAttachedToStation(stationId);

    return res.status(200).json({
        bikes: bikes,
    });
};

//? ======================================
//? = Vet inte riktigt vad dessa ska göra
//? ======================================

// Add number of bikes in city
const addNewBike = async (req, res) => {
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
        const { longitude, latitude, status } = req.body;

        if (!longitude) {
            return res.status(403).json({
                error: "Coordinates are needed for the Bike (longitude)",
            });
        }

        if (!latitude) {
            return res.status(403).json({
                error: "Coordinates are needed for the Bike (latitude)",
            });
        }

        if (!status) {
            return res
                .status(403)
                .json({ error: "Status of bike is unavailable" });
        }

        const insert = {
            table: "Bike",
            longitude: longitude,
            latitude: latitude,
            status: status,
        };

        await dbCreate.functionsForAllTables.insertTable(insert);

        return res.status(200).json({
            message: "Bikes have been added to city.",
        });
    } catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
};

// Update number of bikes in city
const updateNumberBikes = async (req, res) => {
    const apiKey = req.query.apiKey;
    const cityId = req.params.id;
    const numberId = req.params.nr;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!cityId) {
        return res.status(403).json({ error: "Missing cityId for the city!." });
    }

    if (!numberId) {
        return res
            .status(403)
            .json({ error: "Missing number of bikes to add to the city!." });
    }

    return res.status(200).json({
        message: "Bikes have been updated in the city.",
    });
};

// Remove number of bikes from city
const deleteNumberBikes = async (req, res) => {
    const apiKey = req.query.apiKey;
    const cityId = req.params.id;
    const numberId = req.params.nr;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!cityId) {
        return res.status(403).json({ error: "Missing cityId for the city!." });
    }

    if (!numberId) {
        return res
            .status(403)
            .json({ error: "Missing number of bikes to remove to the city!." });
    }

    return res.status(200).json({
        message: "Bikes have been removed from the city.",
    });
};

module.exports = {
    getAllCities,
    addNewCity,
    getSpecificCity,
    getBikesCity,
    getCityZone,
    getCityChargingStation,
    getBikeChargingOnStation,
    addNewBike,
    updateNumberBikes,
    deleteNumberBikes,
    getAllStations,
    getAllZones,
};
