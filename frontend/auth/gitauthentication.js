const authorization = require("./authorization.js");

const clientID = "c40fb77fa87796607ad9";
const clientSecret = "33909380358de1cf2634961840b3f436d6e0236b";
const { apiAddress } = require("../apiaddress.js");
const gitAuthentication = {
    gitLogin: (token) => {
        return authorization.gitAuthorization(token).then((res) => {
            return fetch(`${apiAddress}/gituser/${res.login}?apiKey=1`, {
                method: "GET",
            })
                .then((result) => result.json())
                .then((data) => {
                    return { user: data.users, token: token };
                });
        });
    },

    gitSignup: (req, res) => {
        const username = req.body.username;
        const access_token = req.session.access_token;
        return authorization
            .gitAuthorization(access_token)
            .then((result) => {
                const requestBody = {
                    username: username,
                    git_id: result.login,
                };
                return fetch(`${apiAddress}/gituser?apiKey=1`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }).then((result) => {
                    if (result.status !== 200) {
                        const msg = "Username already exists";
                        return res.render("gitsignup.ejs", { msg });
                    }
                    delete req.session.access_token;
                    authorization.updateSession(req, username, "User");
                    return res.redirect("/user/user");
                });
            })
            .catch((error) => {
                console.log(error);
                return res.redirect("/user/userlogin");
            });
    },

    getAccessToken: (req, res) => {
        console.log("getAccessToken");
        const requestToken = req.query.code;

        fetch(
            `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
            {
                method: "post",
                headers: {
                    accept: "application/json",
                },
            },
        )
            .then((result) => result.json())
            .then((resData) => {
                const accessToken = resData.access_token;
                return gitAuthentication
                    .gitLogin(accessToken)
                    .then((result) => {
                        if (result.user.length !== 1) {
                            req.session.access_token = result.token;
                            return res.redirect("/user/gitsignup");
                        }
                        authorization.updateSession(req, result.user[0].id, "User");
                        return res.redirect("/user/user");
                    });
            })
            .catch(() => {
                return res.redirect("/user/userlogin");
            });
    },
};

module.exports = {
    gitAuthentication,
};
