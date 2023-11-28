"use strict";

const bikes = require("../src/admin/bikes.js");

const viewHome = async (req, res) => {
    const allBikes = await bikes.getBikes();

    console.log(allBikes);

    res.render("index.ejs", {
        title: "Admin Dashboard",
        message: "This is the Admin dashboard!",
        bikes: allBikes,
    });
};

module.exports = {
    viewHome,
};
