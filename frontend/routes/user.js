"use strict";

const axios = require("axios");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

const clientID = "c40fb77fa87796607ad9";
const clientSecret = "33909380358de1cf2634961840b3f436d6e0236b";

router.use((req, res, next) => {
    req.app.set("views", "./views/user/pages");
    next();
});

router.get("/", (req, res) => {
    userController.viewHome(req, res);
});

router.get("/userlogin", (req, res) => {
    res.render("user_login.ejs");
});

router.get("/createuser", (req, res) => {
    res.render("create_user.ejs");
});

// Declare the redirect route
router.get("/authenticate", (req, res) => {
    // The req.query object has the query params that were sent to this route.
    const requestToken = req.query.code;
    
    axios({
        method: "post",
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSON
        headers: {
            accept: "application/json"
        }
    }).then((response) => {
        const accessToken = response.data.access_token;
        //console.log(response.data);
        // redirect the user to the home page, along with the access token
        res.redirect(`user?access_token=${accessToken}`);
    });
});

router.get("/user", (req, res) => {
    res.render("front.ejs");
});

router.get("/details", (req, res) => {
    res.render("details.ejs");
});

router.get("/detailsedit", (req, res) => {
    res.render("details_edit.ejs");
});

router.get("/history", (req, res) => {
    res.render("history.ejs");
});

router.get("/wallet", (req, res) => {
    res.render("wallet.ejs");
});

router.get("/prepaid", (req, res) => {
    res.render("wallet_prepaid.ejs");
});

router.get("/autogiro", (req, res) => {
    res.render("wallet_autogiro.ejs");
});

module.exports = router;
