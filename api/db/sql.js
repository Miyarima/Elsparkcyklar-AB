"use strict";

const mysql = require("mysql2/promise");

let db;
const config = {
    host: "db",
    port: "3307",
    user: "vteam",
    password: "vteam",
    database: "Elsparkcyklar",
    multipleStatements: true,
};

(async function () {
    db = await mysql.createConnection(config);

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
