"use strict";

// const db = require("../db/databaseFunctions.js");
const db = require("../db/sql.js");
const dbCreate = require("../db/functionsForAllTables.js");

// Get all available users in system
const getAllUsers = async (req, res) => {
    const apiKey = req.query.apiKey;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    const users = await db.gatheredUserFunctions.allUsers();

    return res.status(200).json({
        users: users,
    });
};

// Get all available users in system
const addUser = async (req, res) => {
    const apiKey = req.query.apiKey;
    const contentType = req.headers["content-type"];
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

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

    if (!username) {
        return res
            .status(403)
            .json({ error: "A username is needed to create user" });
    }

    if (!password) {
        return res
            .status(403)
            .json({ error: "A password for the user is needed" });
    }

    if (!email) {
        return res
            .status(403)
            .json({ error: "A email for the user is needed" });
    }

    const insert = {
        table: "User",
        username: username,
        password: password,
        email: email,
    };

    await dbCreate.functionsForAllTables.insertTable(insert);

    return res.status(200).json({
        message: "A new user has been created",
    });
};

// Get all available users in system
const updateSpecificUser = async (req, res) => {
    const apiKey = req.query.apiKey;
    const userId = req.params.id;
    const contentType = req.headers["content-type"];
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

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

    const update = {
        table: "User",
        id: userId,
    };

    if (username) {
        update.username = username;
    }

    if (password) {
        update.password = password;
    }

    if (email) {
        update.email = email;
    }

    // await dbCreate.functionsForAllTables.insertTable(insert);
    await dbCreate.functionsForAllTables.oneRowUpdateTable(update);

    return res.status(200).json({
        message: "A new user has been created",
    });
};

// Get all available users in system
const getSpecificUser = async (req, res) => {
    const apiKey = req.query.apiKey;
    const userId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    const user = await db.gatheredUserFunctions.specificUser(userId);

    return res.status(200).json({
        users: user,
    });
};

// Get all travel for specific user
const getTravelUser = async (req, res) => {
    const apiKey = req.query.apiKey;
    const userId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!userId) {
        return res
            .status(403)
            .json({ error: "Missing userId for specific user." });
    }

    const user = await db.gatheredUserFunctions.selectTravelsForUser(userId);

    return res.status(200).json({
        users: user,
    });
};

const deleteSpecificUser = async (req, res) => {
    const apiKey = req.query.apiKey;
    const userId = req.params.id;

    if (!apiKey) {
        return res.status(403).json({ error: "Please provide an API key." });
    }

    if (!userId) {
        return res
            .status(403)
            .json({ error: "Please provide correct ID for a bike." });
    }

    const deleted = await db.gatheredUserFunctions.deleteUser(userId);

    return res.status(200).json({
        message: "the user has been deleted",
        status: deleted,
    });
};

module.exports = {
    getAllUsers,
    addUser,
    getSpecificUser,
    getTravelUser,
    updateSpecificUser,
    deleteSpecificUser,
};
