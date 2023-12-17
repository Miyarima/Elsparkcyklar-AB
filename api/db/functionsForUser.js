"use strict";
const dbFunctions = require("./databaseFunctions");

const dbFuncs = dbFunctions.gatheredDatabaseFunctions;

const gatheredUserFunctions = {
    /**
     * All Users from the database
     * @async
     * @function
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    allUsers: async () => {
        const queryObject = {
            query: "SELECT * FROM User",
            params: [],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Specific user from the database
     * @async
     * @function
     * @param {int} userId id for user
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    specificUser: async (userId) => {
        const queryObject = {
            query: "SELECT * FROM User WHERE id = ?",
            params: [userId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Delete specific user from the database
     * @async
     * @function
     * @param {int} userId id for user
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    deleteUser: async (userId) => {
        const queryObject = {
            query: "DELETE FROM User WHERE id = ?",
            params: [userId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Select all the travels for specific user
     * @async
     * @function
     * @param {int} userId id for user
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    selectTravelsForUser: async (userId) => {
        const queryObject = {
            query: "SELECT * FROM Travel WHERE `id` = ?",
            params: [userId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Select all rows with email_id
     * @async
     * @function
     * @param {int} email_id email_id
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
        selectRowsWithEmail: async (email_id) => {
            const queryObject = {
                query: "SELECT * FROM User WHERE `email` = ? OR",
                params: [email_id],
            };
            return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
        },

    /**
     * Select invoices for specific user
     * @async
     * @function
     * @param {int} userId id for user
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    selectInvoicesForUser: async (userId) => {
        const queryObject = {
            query: "SELECT i.* FROM Invoice i LEFT JOIN Travel t ON i.travel_id = t.id WHERE t.`id` = ?",
            params: [userId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Select role and user from api key.
     * @async
     * @function
     * @param {int} apiKey api key
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    selectRoleFromApiKey: async (apiKey) => {
        const queryObject = {
            query: "SELECT id,role FROM User WHERE api_key = ?",
            params: [apiKey],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Select role and user from api key.
     * @async
     * @function
     * @param {int} gitUsername gitUsername
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
        getUsernameFromGit: async (gitUsername) => {
            const queryObject = {
                query: "SELECT id FROM User WHERE git_id = ?",
                params: [gitUsername],
            };
            return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
        },

    /**
     * Function to pay invoice
     * @async
     * @function
     * @param {int} invoiceId invoice id
     * @returns {bool} True if the querys were succesful, otherwise an error.
     */
    payInvoice: async (invoiceId) => {
        const currentDate = new Date();

        const queryObject = {
            query: "UPDATE User u RIGHT JOIN Travel t ON u.id = t.id RIGHT JOIN Invoice i ON t.id = i.travel_id SET u.wallet = u.wallet - t.total_cost WHERE i.id = ?",
            params: [invoiceId],
        };

        const queryObject2 = {
            query: "UPDATE Invoice SET date_paid = ? WHERE id = ?",
            params: [currentDate.toDateString(), invoiceId],
        };

        return await dbFuncs.promisifiedTransactionFunc([
            queryObject,
            queryObject2,
        ]);
    },
};

module.exports = {
    gatheredUserFunctions,
};
