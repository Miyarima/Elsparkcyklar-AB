"use strict";

const express = require("express");
const router = express.Router();
const privateApiController = require("../controllers/privateApiController.js");

router.get("/", (req, res) => {
    privateApiController.viewHome(req, res);
});

module.exports = router;
