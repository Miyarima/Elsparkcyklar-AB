"use strict";

const print = require("../src/user/printHello.js");

const viewHome = (req, res) => {
    print.hello();

    res.render("index.ejs", {
        title: "Users Dashboard",
        message: "hello!",
    });
};

module.exports = {
    viewHome,
};
