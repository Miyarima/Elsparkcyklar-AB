const standardAuth = {
    simpleAuthorization: (role) => {
        return (req, res, next) => {
            if (req.session.username && req.session.role === role) {
                next();
            } else {
                req.session.destroy();
                return res.redirect("/user/userlogin");
            }
        };
    },

    insertUser: (req, res) => {
        const { username, password, email } = req.body;

        return fetch("http://api:8080/api/user?apiKey=1", {
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
                        if (result.status === 500) {
                            //Handling error message from the database
                            const extractedString = errorMsg.error.substring(
                                errorMsg.error.lastIndexOf("."),
                                errorMsg.error.lastIndexOf("'"),
                            );
                            msg = extractedString.includes("PRIMARY")
                                ? "Username already exists"
                                : extractedString.includes("email")
                                  ? extractedString.charAt(0).toUpperCase +
                                    extractedString.slice(1) +
                                    "already exists"
                                  : "There was an error";
                        }
                        return res.render("create_user.ejs", { msg });
                    });
                }
                req.session.username = username;
                req.session.role = "User";
                return res.redirect("/user/user");
            })
            .catch((error) => {
                console.log(error);
                return res.redirect("/user/userlogin");
            });
    },
};

module.exports = {
    standardAuth,
};
