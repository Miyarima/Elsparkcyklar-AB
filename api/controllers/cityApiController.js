"use strict";

// const db = require("../db/databaseFunctions.js");
const db = require("../db/sql.js");

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

// Inserts new city
const addNewCity = async (req, res) => {
    const apiKey = req.query.apiKey;
    const cityName = req.params.name;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!cityName) {
        return res.status(403).json({ error: "Missing name for the city!." });
    }

    return res.status(200).json({
        message: `${cityName} has been added.`,
    });
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
    const cityId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!cityId) {
        return res.status(403).json({ error: "Missing id for the city!." });
    }

    // ! funkar inte
    const citiesAndBikes = db.gatheredCityFunctions.allBikesAndItsCities();

    return res.status(200).json({
        bikes: citiesAndBikes,
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
    // const cityId = req.params.id;
    const zoneId = req.params.zoneid;
    // const chargingId = req.params.chargingid;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    // if (!cityId) {
    //     return res.status(403).json({ error: "Missing id for the city!." });
    // }

    if (!zoneId) {
        return res.status(403).json({ error: "Missing zoneId for the city!." });
    }

    // if (!chargingId) {
    //     return res
    //         .status(403)
    //         .json({ error: "Missing chargingId for the city!." });
    // }

    const availablePorts =
        db.gatheredCityFunctions.availablePortsForStation(zoneId);

    return res.status(200).json({
        ports: availablePorts,
    });
};

// Add number of bikes in city
const addNumberBikes = async (req, res) => {
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
        message: "Bikes have been added to city.",
    });
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
    addNumberBikes,
    updateNumberBikes,
    deleteNumberBikes,
};
