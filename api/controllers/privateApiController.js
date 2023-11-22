"use strict";

const viewHome = (req, res) => {
    res.status(200).json({ message: "this is the api route!" });
};

module.exports = {
    viewHome,
};
