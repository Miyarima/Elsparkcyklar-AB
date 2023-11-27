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
        console.log("NO API KEY!");
        return res.status(403).json({ error: "Please provide an API key." });
    }

    console.log("API KEY GIVEN!");
    return res.status(200).json({
        bikes: bikes,
    });
};

module.exports = {
    getAllRoutes,
    getAllBikes,
};
