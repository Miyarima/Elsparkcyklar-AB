module.exports = {
    simpleAuthorization: (role) => {
        return (req, res, next) => {
            if (req.session.username && req.session.role === role) {
                next();
            } else {
                const redirectRoute = role === "Admin" ? "/admin/adminlogin" : "user/userlogin";
                req.session.destroy();
                return res.redirect(redirectRoute);
            }
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
