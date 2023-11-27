"use strict";

const express = require("express");
const router = express.Router();
const privateApiController = require("../controllers/privateApiController.js");

router.get("/", (req, res) => {
    privateApiController.getAllRoutes(req, res);
});

router.get("/bikes", (req, res) => {
    privateApiController.getAllBikes(req, res);
});

module.exports = router;
