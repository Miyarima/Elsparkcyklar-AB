"use strict";

const bikes = require("../src/admin/bikes.js");
let { apiAddress } = require("../apiaddress.js");
apiAddress += "/admin";
const viewHome = async (req, res) => {
    const allBikes = await bikes.getBikes();

    console.log(allBikes);

    res.render("index.ejs", {
        title: "Admin Dashboard",
        message: "This is the Admin dashboard!",
        bikes: allBikes,
    });
};

const allCities = async (req, res, apiKey) => {
    try {
        const response = await fetch(`${apiAddress}/cities?apiKey=${apiKey}`);
        const cityData = await response.json();
        const cityMalmoe = [];
        const cityStockholm = [];

        for (const stad of cityData.cities) {
            if (stad.city === "Stockholm") {
                cityStockholm.push(stad);
            } else {
                cityMalmoe.push(stad);
            }
        }

        console.log(cityMalmoe);
        console.log(cityMalmoe);

        res.render("cities.ejs");
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const allBikes = async (req, res, apiKey) => {
    try {
        const response = await fetch(`${apiAddress}/bikes?apiKey=${apiKey}`);
        const bikeData = await response.json();

        res.render("bikes.ejs", { bikes: bikeData.bikes });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const allCustomers = async (req, res, apiKey) => {
    try {
        const response = await fetch(`${apiAddress}/users?apiKey=${apiKey}`);
        const userData = await response.json();

        res.render("customers.ejs", { users: userData.users });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    viewHome,
    allCities,
    allBikes,
    allCustomers,
};
