const authorization = require("./authorization.js");

const clientID = "c40fb77fa87796607ad9";
const clientSecret = "33909380358de1cf2634961840b3f436d6e0236b";

const gitAuthentication = {

    gitLogin: (token) => {
        return authorization.gitAuthorization(token).then((res) => {
            return fetch(`http://api:8080/api/gituser/${res.login}?apiKey=1`, {
                method: "GET",
            })
                .then((result) => result.json())
                .then((data) => {
                    return { exists: data.users.length === 1, token: token };
                });
        });
    },

    gitSignup: (req, res) => {
        const username = req.body.username;
        const access_token = req.session.access_token;
        return authorization.gitAuthorization(access_token)
            .then((result) => {
                const requestBody = {
                    username: username,
                    git_id: result.login,
                };
                return fetch("http://api:8080/api/gituser?apiKey=1", {
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
                return gitAuthentication.gitLogin(accessToken).then((result) => {
                    if (!result.exists) {
                        req.session.access_token = result.token;
                        return res.redirect("/user/gitsignup");
                    }
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
