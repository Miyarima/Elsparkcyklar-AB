const authorization = require("./authorization.js");
const { apiAddress } = require("../apiaddress.js");
const standardAuthentication = {
    insertUser: (req, res) => {
        const { username, password, email } = req.body;

        return fetch(`${apiAddress}/user?apiKey=1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email,
            }),
        })
            .then((result) => {
                if (result.status === 403 || result.status === 500) {
                    return result.json().then((errorMsg) => {
                        let msg = errorMsg.error;
                        console.log(msg);
                        if (result.status === 500) {
                            //Handling error message from the database
                            const extractedString = errorMsg.error.substring(
                                errorMsg.error.lastIndexOf("."),
                                errorMsg.error.lastIndexOf("'"),
                            );
                            msg = extractedString.includes("PRIMARY")
                                ? "Username already exists"
                                : extractedString.includes("email")
                                    ? " Email already exists"
                                    : "There was an error";
                        }
                        return res.render("create_user.ejs", { msg });
                    });
                }
                authorization.updateSession(req, username, "User");
                return res.redirect("/user/user");
            })
            .catch(() => {
                return res.redirect("/user/userlogin");
            });
    },

    authenticateLogin: (username, password, role) => {
        return fetch(`${apiAddress}/user/${username}?apiKey=1`, {
            method: "GET",
        })
            .then((result) => result.json())
            .then((data) => {
                if (
                    !data.users[0] ||
                    password !== data.users[0].password ||
                    data.users[0].role !== role
                ) {
                    throw new Error("incorrect credentials");
                }
            });
    },

    /*
        3 Very similar authentication functions. Just in case you want to specify unique authentication handling for each type in the future.
    */
    authenticateLoginUser: (req, res) => {
        standardAuthentication
            .authenticateLogin(req.body.username, req.body.password, "User")
            .then(() => {
                authorization.updateSession(req, req.body.username, "User");
                return res.redirect("/user/user");
            })
            .catch((error) => {
                console.log(error);
                const err = error.message;
                const msg =
                    err === "incorrect credentials"
                        ? err
                        : "Something went wrong";
                return res.render("user_login.ejs", { msg });
            });
    },

    authenticateLoginMobileUser: (req, res) => {
        standardAuthentication
            .authenticateLogin(req.body.username, req.body.password, "User")
            .then(() => {
                authorization.updateSession(req, req.body.username, "User");
                return res.redirect("/mobile/rent");
            })
            .catch((error) => {
                const err = error.message;
                const msg =
                    err === "incorrect credentials"
                        ? err
                        : "Something went wrong";
                return res.render("mobile_login.ejs", { msg });
            });
    },

    authenticateLoginAdmin: (req, res) => {
        standardAuthentication
            .authenticateLogin(req.body.username, req.body.password, "Admin")
            .then(() => {
                authorization.updateSession(req, req.body.username, "Admin");
                return res.redirect("/admin/admin");
            })
            .catch((error) => {
                const err = error.message;
                const msg =
                    err === "incorrect credentials"
                        ? err
                        : "Something went wrong";
                return res.render("user_login.ejs", { msg });
            });
    },
};

module.exports = {
    standardAuthentication,
};
