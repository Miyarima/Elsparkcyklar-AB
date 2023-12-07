"use strict";

// const db = require("../db/databaseFunctions.js");

const getAllRoutes = async (req, res) => {
    const apiKey = req.query.apiKey;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

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

// const getAllBikes = async (req, res) => {
//     const apiKey = req.query.apiKey;

//     const bikes = await db.getAllBikes();

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     return res.status(200).json({
//         bikes: bikes,
//     });
// };

// const rentBike = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const bikeId = req.params.id;
//     const contentType = req.headers["content-type"];
//     const { user } = req.body;

//     // Check for apiKey provided
//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     // Check for the required headers
//     if (!contentType || contentType !== "application/json") {
//         return res
//             .status(400)
//             .json({ error: "Content-Type must be application/json" });
//     }

//     // Check for the required body content
//     if (!req.body || Object.keys(req.body).length === 0) {
//         return res
//             .status(400)
//             .json({ error: "Request body is missing or empty" });
//     }

//     // checking if a user was provided in the body
//     if (!user) {
//         return res
//             .status(400)
//             .json({ error: "No user to rent the bike was provided" });
//     }

//     // If the provided bikeId didn't exsist in the database
//     if (!bikeId) {
//         return res
//             .status(403)
//             .json({ error: "Please provide correct ID for a bike." });
//     }

//     return res.status(200).json({
//         message: "bike has been rented",
//     });
// };

// const returnBike = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const bikeId = req.params.id;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!bikeId) {
//         console.log("NO BIKE ID GIVEN!");
//         return res
//             .status(403)
//             .json({ error: "Please provide correct ID for a bike." });
//     }

//     return res.status(200).json({
//         message: "bike has been returned",
//     });
// };

// const getBikePosition = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const bikeId = req.params.id;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!bikeId) {
//         return res
//             .status(403)
//             .json({ error: "Please provide correct ID for a bike." });
//     }

//     return res.status(200).json({
//         message: "here is the bikes position",
//     });
// };

// const setBikePosition = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const bikeId = req.params.id;
//     const contentType = req.headers["content-type"];
//     const { position } = req.body;

//     // Check for apiKey provided
//     if (!apiKey) {
//         console.log("NO API KEY!");
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     // Check for the required headers
//     if (!contentType || contentType !== "application/json") {
//         return res
//             .status(400)
//             .json({ error: "Content-Type must be application/json" });
//     }

//     // Check for the required body content
//     if (!req.body || Object.keys(req.body).length === 0) {
//         return res
//             .status(400)
//             .json({ error: "Request body is missing or empty" });
//     }

//     // checking if a position was provided in the body
//     if (!position) {
//         return res.status(400).json({
//             error: "No position was provided, so the bike can't be changed",
//         });
//     }

//     // If the provided bikeId didn't exsist in the database
//     if (!bikeId) {
//         return res
//             .status(403)
//             .json({ error: "Please provide correct ID for a bike." });
//     }

//     return res.status(200).json({
//         message: "bike position has been set",
//     });
// };

// const updateBikePosition = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const bikeId = req.params.id;
//     const contentType = req.headers["content-type"];
//     const { position } = req.body;

//     // Check for apiKey provided
//     if (!apiKey) {
//         console.log("NO API KEY!");
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     // Check for the required headers
//     if (!contentType || contentType !== "application/json") {
//         return res
//             .status(400)
//             .json({ error: "Content-Type must be application/json" });
//     }

//     // Check for the required body content
//     if (!req.body || Object.keys(req.body).length === 0) {
//         return res
//             .status(400)
//             .json({ error: "Request body is missing or empty" });
//     }

//     // checking if a position was provided in the body
//     if (!position) {
//         return res.status(400).json({
//             error: "No position was provided, so the bike can't be changed",
//         });
//     }

//     // If the provided bikeId didn't exsist in the database
//     if (!bikeId) {
//         return res
//             .status(403)
//             .json({ error: "Please provide correct ID for a bike." });
//     }

//     return res.status(200).json({
//         message: "updated position of bike",
//     });
// };

// const getSpecificBike = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const bikeId = req.params.id;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!bikeId) {
//         return res
//             .status(403)
//             .json({ error: "Please provide correct ID for a bike." });
//     }

//     return res.status(200).json({
//         message: "here is the status of the bike",
//     });
// };

// const turnOffSpecificBike = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const bikeId = req.params.id;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!bikeId) {
//         return res
//             .status(403)
//             .json({ error: "Please provide correct ID for a bike." });
//     }

//     return res.status(200).json({
//         message: "turning of this bike",
//     });
// };

// const deleteSpecificBike = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const bikeId = req.params.id;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!bikeId) {
//         return res
//             .status(403)
//             .json({ error: "Please provide correct ID for a bike." });
//     }

//     return res.status(200).json({
//         message: "deleting this bike",
//     });
// };

// // Get all information about the cities
// const getAllCities = async (req, res) => {
//     const apiKey = req.query.apiKey;

//     const cities = await db.getAllCities();

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     return res.status(200).json({
//         cities: cities,
//     });
// };

// // Inserts new city
// const addNewCity = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const cityName = req.params.name;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!cityName) {
//         return res.status(403).json({ error: "Missing name for the city!." });
//     }

//     return res.status(200).json({
//         message: `${cityName} has been added.`,
//     });
// };

// // Get all the information about a specific city
// const getSpecificCity = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const cityId = req.params.id;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!cityId) {
//         return res.status(403).json({ error: "Missing id for the city!." });
//     }

//     return res.status(200).json({
//         message: `Information of the city with id ${cityId}`,
//     });
// };

// // Get bikes in specific city
// const getBikesCity = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const cityId = req.params.id;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!cityId) {
//         return res.status(403).json({ error: "Missing id for the city!." });
//     }

//     return res.status(200).json({
//         bikes: cityId,
//     });
// };

// // Get zones, bikes and charging station in specific city
// const getCityZone = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const cityId = req.params.id;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!cityId) {
//         return res.status(403).json({ error: "Missing id for the city!." });
//     }

//     return res.status(200).json({
//         bikes: cityId,
//     });
// };

// // Get specific zone and charging station within zone
// const getCityChargingStation = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const cityId = req.params.id;
//     const zoneId = req.params.zoneid;
//     const chargingId = req.params.chargingid;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!cityId) {
//         return res.status(403).json({ error: "Missing id for the city!." });
//     }

//     if (!zoneId) {
//         return res.status(403).json({ error: "Missing zoneId for the city!." });
//     }

//     if (!chargingId) {
//         return res
//             .status(403)
//             .json({ error: "Missing chargingId for the city!." });
//     }

//     return res.status(200).json({
//         chargingid: chargingId,
//     });
// };

// // Add number of bikes in city
// const addNumberBikes = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const cityId = req.params.id;
//     const numberId = req.params.nr;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!cityId) {
//         return res.status(403).json({ error: "Missing cityId for the city!." });
//     }

//     if (!numberId) {
//         return res
//             .status(403)
//             .json({ error: "Missing number of bikes to add to the city!." });
//     }

//     return res.status(200).json({
//         message: "Bikes have been added to city.",
//     });
// };

// // Update number of bikes in city
// const updateNumberBikes = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const cityId = req.params.id;
//     const numberId = req.params.nr;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!cityId) {
//         return res.status(403).json({ error: "Missing cityId for the city!." });
//     }

//     if (!numberId) {
//         return res
//             .status(403)
//             .json({ error: "Missing number of bikes to add to the city!." });
//     }

//     return res.status(200).json({
//         message: "Bikes have been updated in the city.",
//     });
// };

// // Remove number of bikes from city
// const deleteNumberBikes = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const cityId = req.params.id;
//     const numberId = req.params.nr;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!cityId) {
//         return res.status(403).json({ error: "Missing cityId for the city!." });
//     }

//     if (!numberId) {
//         return res
//             .status(403)
//             .json({ error: "Missing number of bikes to remove to the city!." });
//     }

//     return res.status(200).json({
//         message: "Bikes have been removed from the city.",
//     });
// };

// // Get all available users in system
// const getAllUsers = async (req, res) => {
//     const apiKey = req.query.apiKey;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     return res.status(200).json({
//         message: "Returns a list of all users in system.",
//     });
// };

// // Get all travel for specific user
// const getTravelUser = async (req, res) => {
//     const apiKey = req.query.apiKey;
//     const userId = req.params.id;

//     if (!apiKey) {
//         return res.status(403).json({ error: "Please provide an API key." });
//     }

//     if (!userId) {
//         return res
//             .status(403)
//             .json({ error: "Missing userId for specific user." });
//     }

//     return res.status(200).json({
//         message: "Returns all history of specific user.",
//     });
// };

module.exports = {
    getAllRoutes,
    // getAllBikes,
    // rentBike,
    // returnBike,
    // getBikePosition,
    // getSpecificBike,
    // setBikePosition,
    // updateBikePosition,
    // turnOffSpecificBike,
    // deleteSpecificBike,
    // getAllCities,
    // addNewCity,
    // getSpecificCity,
    // getBikesCity,
    // getCityZone,
    // getCityChargingStation,
    // addNumberBikes,
    // updateNumberBikes,
    // deleteNumberBikes,
    // getAllUsers,
    // getTravelUser,
};
