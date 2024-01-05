"use strict";

const print = require("../src/user/printHello.js");
const baseURL = "http://api:8080/api/v1/user";
const apiKey = 123;

const viewHome = (req, res) => {
    print.hello();

    res.render("index.ejs", {
        title: "Users Dashboard",
        message: "hello!",
    });
};

const getUserHistory = async (req, res, userId) => {
    try {
        const response = await fetch(
            `${baseURL}/${userId}/travel?apiKey=${apiKey}`,
        );
        const userData = await response.json();

        return userData.users;
    } catch (error) {
        console.log("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const specificUser = async (req, res, userId) => {
    try {
        const response = await fetch(`${baseURL}/${userId}?apiKey=${apiKey}`);
        const userData = await response.json();

        res.render("front.ejs", { users: userData.users });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const detailsSpecificUser = async (req, res, userId) => {
    try {
        const response = await fetch(`${baseURL}/${userId}?apiKey=${apiKey}`);
        const userData = await response.json();

        return userData.users;
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateUserWallet = async (req, res, userId, amount) => {
    try {
        const response = await fetch(`${baseURL}/${userId}?apiKey=${apiKey}`);
        const userData = await response.json();

        const newWallet = parseInt(userData.users[0].wallet, 10) + parseInt(amount, 10);

        var updateWallet =
        {
            username: userId,
            wallet: newWallet,
        };

        await fetch(`${baseURL}?apiKey=${apiKey}`, {
            body: JSON.stringify(updateWallet),
            headers: {
                "content-type": "application/json"
            },
            method: "PUT"
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deductUserWallet = async (req, res, userId, amount) => {
    try {
        const response = await fetch(`${baseURL}/${userId}?apiKey=${apiKey}`);
        const userData = await response.json();

        const newWallet = parseInt(userData.users[0].wallet, 10) - parseInt(amount, 10);

        console.log(newWallet);

        var updateWallet =
        {
            username: userId,
            wallet: newWallet,
        };

        await fetch(`${baseURL}?apiKey=${apiKey}`, {
            body: JSON.stringify(updateWallet),
            headers: {
                "content-type": "application/json"
            },
            method: "PUT"
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};


const updateEmailAddress = async (req, res, userId, email) => {
    try {
        const response = await fetch(`http://api:8080/api/v1/users?apiKey=${apiKey}`);
        const allUsers = await response.json();

        if (!allUsers.users.some(user => user.email === email)) {
            var updateEmail =
            {
                username: userId,
                email: email,
            };

            await fetch(`${baseURL}?apiKey=${apiKey}`, {
                body: JSON.stringify(updateEmail),
                headers: {
                    "content-type": "application/json"
                },
                method: "PUT"
            });

            console.log("email updated!");
            return;
        }

        console.error("Email already in use, has to be unique.");
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
    updateUserWallet,
    updateEmailAddress,
    deductUserWallet,
};
