"use strict";

const print = require("../src/mobile/printHello.js");

const viewHome = (req, res) => {
    print.hello();

    res.render("index.ejs", {
        title: "Mobile App",
        message: "hello!",
    });
};

module.exports = {
    viewHome,
};
