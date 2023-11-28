"use strict";

const db = require("../db/sql.js");

const getAllRoutes = async (req, res) => {
    const apiKey = req.query.apiKey;

    if (!apiKey) {
        console.log("NO API KEY!");
        return res.status(403).json({ error: "Please provide an API key." });
    }

    console.log("API KEY GIVEN!");
    return res.status(200).json({
        rotues: [
            "/city",
            "/city/{id}",
            "/city/{id}/bike",
            "/city/{id}/bike/{nr}",
            "/user",
            "/user/{id}",
            "/bike",
            "/bike/{id}/rent",
            "/bike/{id}/returned",
            "/bike/{id}/position",
            "/bike/{id}",
        ],
    });
};

const getAllBikes = async (req, res) => {
    const apiKey = req.query.apiKey;

    const bikes = await db.getAllBikes();

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    return res.status(200).json({
        bikes: bikes,
    });
};

// Tänkar att ett fetch ser ut så här
//     const result = await fetch(`https://api:8080/api/bike/:id/rent?apiKey=${apiKey}`, {
//         body: {
//             user: "mos",
//         },
//         headers: {
//             'content-type': 'application/json'
//         },
//         method: 'PUT'
//     });

const rentBike = async (req, res) => {
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

const returnBike = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!bikeId) {
        console.log("NO BIKE ID GIVEN!");
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    return res.status(200).json({
        message: "bike has been returned",
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

    return res.status(200).json({
        message: "here is the bikes position",
    });
};

const setBikePosition = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bikeId = req.params.id;
    const contentType = req.headers["content-type"];
    const { position } = req.body;

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

    // checking if a position was provided in the body
    if (!position) {
        return res.status(400).json({
            error: "No position was provided, so the bike can't be changed",
        });
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

    return res.status(200).json({
        message: "here is the status of the bike",
    });
};

module.exports = {
    getAllRoutes,
    getAllBikes,
    rentBike,
    returnBike,
    getBikePosition,
    getSpecificBike,
    setBikePosition,
};
