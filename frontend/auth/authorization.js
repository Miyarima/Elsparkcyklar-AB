module.exports = {
    simpleAuthorization: (role, redirection) => {
        return (req, res, next) => {
            if (req.session.username && req.session.role === role) {
                next();
                return;
            }
            return res.redirect(redirection);
        };
    },

    updateSession: (req, username, role) => {
        req.session.username = username;
        req.session.role = role;
    },

    gitAuthorization: (token) => {
        return fetch("https://api.github.com/user", {
            headers: {
                Authorization: "token " + token,
            },
        })
            .then((result) => result.json())
            .then((resJson) => {
                if (resJson.message === "Bad credentials") {
                    throw new Error("Bad credentials");
                }
                return resJson;
            });
    },
};
