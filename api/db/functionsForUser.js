"use strict";
const { dbFunctions } = require("./databaseFunctions");

const dbFuncs = dbFunctions.gatheredDatabaseFunctions;

const gatheredUserFunctions = {
    allUsers: async () => {
        const queryObject = {
            query: "SELECT * FROM User",
            params: [],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    specificUser: async (userId) => {
        const queryObject = {
            query: "SELECT * FROM User WHERE id = ?",
            params: [userId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    deleteUser: async (userId) => {
        const queryObject = {
            query: "DELETE FROM User WHERE id = ?",
            params: [userId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    selectTravelsForUser: async (userId) => {
        const queryObject = {
            query: "SELECT * FROM Travel WHERE `username` = ?",
            params: [userId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    selectInvoicesForUser: async (userId) => {
        const queryObject = {
            query: "SELECT i.* FROM Invoice i LEFT JOIN Travel t ON i.travel_id = t.id WHERE t.`username` = ?",
            params: [userId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    getTravelsForUser: async (userId) => {
        const queryObject = {
            query: "SELECT * FROM Travel WHERE `username` = ?",
            params: [userId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },
};

module.exports = {
    gatheredUserFunctions,
};
