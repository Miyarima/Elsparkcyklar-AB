const authorization = require("./authorization.js");

const standardAuthentication = {

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
                                    ?
                                    " Email already exists"
                                    : "There was an error";
                        }
                        return res.render("create_user.ejs", { msg });
                    });
                }
                authorization.updateSession(req, username, "User");
                return res.redirect("/user/user");
            })
            .catch((error) => {
                console.log(error);
                return res.redirect("/user/userlogin");
            });
    },

    authenticateLogin: (req,res) => {
        const username = req.body.username;
        return fetch(`http://api:8080/api/user/${username}?apiKey=1`, {
            method: "GET",
        })
            .then((result) => result.json())
            .then((data) => {   
                console.log(data.users)
                if (!data.users[0] || req.body.password !== data.users[0].password ) {
                    const msg = "incorrect credentials"
                    return res.render("user_login.ejs", {msg});
                }
                authorization.updateSession(req, username, "User");
                return res.redirect("/user/user");
            });
    }
};

module.exports = {
    standardAuthentication,
};
