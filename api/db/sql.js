"use strict";

const mysql = require("mysql2/promise");

let db;
const config = {
    host: "database",
    port: "3306",
    user: "vteam",
    password: "vteam",
    database: "Elsparkcyklar",
    multipleStatements: true,
};

(async function () {
    try {
        db = await mysql.createConnection(config);
        console.log("Connected to the database!");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }

    // eslint-disable-next-line
    process.on("exit", () => {
        db.end();
    });
})();

const getAllBikes = async () => {
    let sql = `CALL all_bikes();`;
    let [rows] = await db.execute(sql);

    console.log(rows[0]);

    return rows[0];
};

module.exports = {
    getAllBikes,
};
