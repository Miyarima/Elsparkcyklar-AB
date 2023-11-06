"use strict";

const viewHome = (req, res) => {
    res.render("index.ejs", {
        title: "Admin Dashboard",
        message: "hello!",
    });
};

module.exports = {
    viewHome,
};
