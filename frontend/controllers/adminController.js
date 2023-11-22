"use strict";

const print = require("../src/admin/printHello.js");

const viewHome = (req, res) => {
    print.hello();

    res.render("index.ejs", {
        title: "Admin Dashboard",
        message: "hello!",
    });
};

module.exports = {
    viewHome,
};
