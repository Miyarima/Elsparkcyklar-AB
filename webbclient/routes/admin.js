"use strict";

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");

// router.route("/").get(adminController.viewHome).post().put().delete();
router.route("/").get(adminController.viewHome);

module.exports = router;
