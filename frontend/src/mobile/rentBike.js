const { apiAddress } = require("../../apiaddress.js");

module.exports = {
    unfinishedTravelCheck: (username, status) => {
        return fetch(`${apiAddress}/user/${username}/${status}?apiKey=1`, {
            method: "GET",
        })
            .then((result) => result.json())
            .then((data) => data.status.length);
    },

    setTravelSession: (req, res) => {
        return module.exports
            .unfinishedTravelCheck(req.session.username, "Ongoing")
            .then((result) => {
                req.session.travel = result === 0 ? false : true;
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
        console.log(redirectPage);
        return res.render(redirectPage);
    },

    unlockBike: (username, bike) => {
        return module.exports
            .unfinishedTravelCheck(username, "Ongoing")
            .then((result) => {
                if (result !== 0) {
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
                console.log("sucess");
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
    },
};
