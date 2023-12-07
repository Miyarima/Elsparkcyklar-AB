"use strict";

const mysql = require("mysql2");

let pool;


const config = {
    host: "database",
    port: "3306",
    user: "vteam",
    password: "vteam",
    database: "Elsparkcyklar",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};



/**
 * Creates pool
 */
(function () {
    pool = mysql.createPool(config);
    // eslint-disable-next-line
    process.on("exit", () => {
        pool.end();
    });
})();

/**
 * Executes one database query
 * @param {Object} queryOb - object with query key and optional parameter key.
 * @param {function} callback - The callback function to handle the result.
 */
const simpleQuery = (queryOb, callback) => {
    pool.query(queryOb.query, queryOb.params, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
};

/**
 * Function for database transactions.
 * @param {Array.<Object>} queryObjects - Array with query objects.
 * @param {function} callback - The callback function to handle the result.
 */
const transactions = (queryObjects, callback) => {
    pool.getConnection((error, conn) => {
        if (error) {
            return callback(error, null);
        }
        //IIFE function That callbacks.
        //When a callback is made inside the IIFE function, pool.releaseConnection(conn) is executed.
        //The callback function that is used in the IIFE works as a finally block when working with promises.
        //Callback values for the IIFE function is used for the callback function that is passed in the transaction function.
        (function (callback) {
            conn.beginTransaction((error) => {
                if (error) {
                    return callback(error, null);
                }
                for (const queryObject of queryObjects) {
                    //ob is object carrying query and params
                    conn.query(
                        queryObject.query,
                        queryObject.params,
                        (error) => {
                            if (error) {
                                conn.rollback((err) => {
                                    if (err) {
                                        return callback(err, null);
                                    }
                                    return callback(error, null);
                                });
                            }
                            if (
                                queryObject ===
                                queryObjects[queryObjects.length - 1]
                            ) {
                                conn.commit((error) => {
                                    if (error) {
                                        return callback(error, null);
                                    }
                                    //returning true if everything went well
                                    return callback(null, true);
                                });
                            }
                        },
                    );
                }
            });
        })((error, success) => {
            pool.releaseConnection(conn);
            return callback(error, success);
        });
    });
};

const gatheredDatabaseFunctions = {
    /**
     * Function to promisify the simpleQuery function
     * @param {Object} queryObject - object with query key and optional parameter key.
     * @returns {Promise} returns promise
     */
    promisifiedSimpleQueryFunc: (queryObject) => {
        return new Promise((resolve, reject) => {
            simpleQuery(queryObject, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    /**
     * Function to promisify the transaction function
     * @param {Array.<Object>} queryObjects - Array with query objects.
     * @returns {Promise} returns promise
     */
    promisifiedTransactionFunc: (queryObjects) => {
        return new Promise((resolve, reject) => {
            transactions(queryObjects, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
};

module.exports = {
    gatheredDatabaseFunctions,
};
