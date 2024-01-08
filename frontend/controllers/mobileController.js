const { apiAddress } = require("../apiaddress.js");

module.exports = {
    unfinishedTravelCheck: (username, status) => {
        console.log(`${apiAddress}/user/${username}/${status}?apiKey=1`);
        return fetch(`${apiAddress}/user/${username}/${status}?apiKey=1`, {
            method: "GET",
        }).then((result) => result.json());
    },

    setTravelSession: (req, res) => {
        return module.exports
            .unfinishedTravelCheck(req.session.username, "Ongoing")
            .then((result) => {
                req.session.travel =
                    result.status[0] === undefined ? false : true;
                module.exports.getTravelSession(req, res);
            })
            .catch(() => {
                return res.redirect("/mobile/mobilelogin");
            });
    },

    getTravelSession: (req, res) => {
        if (req.session.travel === undefined) {
            module.exports.setTravelSession(req, res);
            return;
        }
        const redirectPage = req.session.travel ? "returnbike.ejs" : "rent.ejs";
        return res.render(redirectPage);
    },

    unlockBike: (username, bike) => {
        return module.exports
            .unfinishedTravelCheck(username, "Ongoing")
            .then((result) => {
                if (result.status[0] !== undefined) {
                    throw new Error();
                }
                return fetch(
                    `${apiAddress}/bike/${bike}/${username}/rent?apiKey=1`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                ).then((result) => {
                    if (result.status !== 200) {
                        console.log(result);
                        throw new Error("Error occured");
                    }
                });
            });
    },

    unlockBikeHandling: (req, res) => {
        return module.exports
            .unlockBike(req.session.username, req.body.bikeId)
            .then(() => {
                req.session.travel = true;
                return res.redirect("/mobile/rent");
            })
            .catch(() => {
                const msg = "An error occured";
                const renderName = !req.session.username
                    ? "mobile_login.ejs"
                    : "rent.ejs";
                return res.render(renderName, { msg });
            });
    },

    rentPost: (req, res) => {
        if (!req.body.rent) {
            res.redirect("/mobile/mobile");
        }

        if (req.body.rent === "unlock") {
            module.exports.unlockBikeHandling(req, res);
            return;
        }

        module.exports.lockBikeHandling(req, res);
        return;
    },

    lockBikeHandling: (req, res) => {
        return module.exports
            .lockBike(req.session.username)
            .then(() => {
                req.session.travel = false;
                return res.redirect("/mobile/rent");
            })
            .catch((error) => {
                console.log("buuu");
                console.log(error);
                const msg = "An error occured";
                const renderName = !req.session.username
                    ? "mobile_login.ejs"
                    : "returnbike.ejs";
                return res.render(renderName, { msg });
            });
    },

    lockBike: (username) => {
        return module.exports
            .unfinishedTravelCheck(username, "Ongoing")
            .then((result) => {
                if (result.status[0] === undefined) {
                    throw new Error();
                }
                const bikeId = result.status[0].bike_id;

                return fetch(`${apiAddress}/bike/${bikeId}?apiKey=1`, {
                    method: "GET",
                })
                    .then((result) => result.json())
                    .then((result) => {
                        const bike = result.bike[0];
                        return fetch(
                            `${apiAddress}/bike/${bike.id}/${bike.longitude}/${bike.latitude}/return?apiKey=1`,
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            },
                        );
                    });
            });
    },
};
