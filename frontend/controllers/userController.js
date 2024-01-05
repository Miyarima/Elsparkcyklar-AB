"use strict";

const print = require("../src/user/printHello.js");
let { apiAddress } = require("../apiaddress.js");
apiAddress += "/user";
const viewHome = (req, res) => {
    print.hello();

    res.render("index.ejs", {
        title: "Users Dashboard",
        message: "hello!",
    });
};

const getUserHistory = async (req, res, userId, apiKey) => {
    try {
        const response = await fetch(
            `${apiAddress}/${userId}/travel?apiKey=${apiKey}`,
        );
        const userData = await response.json();

        console.log(userData);

        res.render("history.ejs", { users: userData.users });
    } catch (error) {
        console.log("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const specificUser = async (req, res, userId, apiKey) => {
    try {
        const response = await fetch(
            `${apiAddress}/${userId}?apiKey=${apiKey}`,
        );
        const userData = await response.json();

        res.render("front.ejs", { users: userData.users });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const detailsSpecificUser = async (req, res, userId, apiKey) => {
    try {
        const response = await fetch(
            `${apiAddress}/${userId}?apiKey=${apiKey}`,
        );
        const userData = await response.json();

        res.render("details.ejs", { users: userData.users });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    viewHome,
    specificUser,
    detailsSpecificUser,
    getUserHistory,
};
