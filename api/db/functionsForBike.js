"use strict";
const dbFunctions = require("./databaseFunctions");

const dbFuncs = dbFunctions.gatheredDatabaseFunctions;

const gatheredBikeFunctions = {
    /**
     * Gets all the bikes from the database
     * @async
     * @function
     * @returns {Array.<Object>} An array containing objects as the result of the database query
     */
    getAllBikes: async () => {
        const queryObject = {
            query: "SELECT * FROM `Bike`",
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Function to get bike from bike id.
     * @async
     * @function
     * @param {int} bikeId bike id
     * @returns {Array.<Object>} An array containing objects as the result of the database query
     */
    getOneBike: async (bikeId) => {
        const queryObject = {
            query: "SELECT * FROM `Bike` WHERE id = ?",
            params: [bikeId],
        };

        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Function to delete the bike.
     * @async
     * @function
     * @param {int} bikeId bike id.
     * @returns {Array.<Object>} An array containing objects as the result of the database query
     */
    deleteBike: async (bikeId) => {
        const queryObject = {
            query: "DELETE FROM Bike WHERE id = ?",
            params: [bikeId],
        };

        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Function to get bike speed and the max speed in its zone
     * @async
     * @function
     * @param {int} bikeId bike id.
     * @returns {Array.<Object>} An array containing objects as the result of the database query
     */
    getMaxSpeedForBike: async (bikeId) => {
        const queryObject = {
            query: "SELECT b.speed AS `speed`, z.id AS `zone_id`, z.max_speed AS `max_speed_in_zone` FROM Bike b LEFT JOIN `Zone` z ON b.zone_id = z.id WHERE b.id = ?",
            params: [bikeId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Function to all bikes and its power status
     * @async
     * @function
     * @param {string} status Status string
     * @returns {Array.<Object>} An array containing objects as the result of the database query
     */
    selectBikesFromPowerStatus: async (status) => {
        const queryObject = {
            query: "SELECT id,power FROM Bike WHERE power = ?",
            params: [status],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Function to all bikes and its power status
     * @async
     * @function
     * @param {int} bikeId bikeId
     * @param {string} status Status string
     * @returns {Array.<Object>} An array containing objects as the result of the database query
     */
    changePowerStatus: async (bikeId, status) => {
        const queryObject = {
            query: "UPDATE Bike SET power = ? WHERE id = ?",
            params: [status, bikeId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Function to all bikes and its power status
     * @async
     * @function
     * @param {int} bikeId bikeId
     * @param {int} userId Status string
     * @returns {bool} True if the querys were succesful, otherwise an error.
     */
    unlockBike: async (bikeId, userId) => {
        const queryObject = {
            query: "INSERT INTO Travel(bike_id, `username`, `status`, start_longitude, start_latitude) VALUES (?, ?, 'Ongoing', (SELECT longitude FROM Bike WHERE id = ?),(SELECT latitude FROM Bike WHERE id = ?))",
            params: [bikeId, userId, bikeId, bikeId],
        };

        const queryObject2 = {
            query: "UPDATE Bike SET `status` = 'Unlocked' WHERE id = ?",
            params: [bikeId],
        };

        return await dbFuncs.promisifiedTransactionFunc([
            queryObject,
            queryObject2,
        ]);
    },

    /**
     * Function to all bikes and its power status
     * @async
     * @function
     * @param {int} bikeId bikeId
     * @returns {bool} True if the querys were succesful, otherwise an error.
     */
    lockBike: async (bikeId) => {
        const currentDate = new Date();

        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + 30);

        const queryObject = {
            query: "INSERT INTO Invoice(travel_id, issue_date, expiry_date) VALUES ((SELECT id FROM Travel WHERE status = 'Ongoing' AND bike_id = ?), ?, ?)",
            params: [
                bikeId,
                currentDate.toDateString(),
                futureDate.toDateString(),
            ],
        };

        const queryObject2 = {
            query: "UPDATE Travel SET status = 'done' WHERE status = 'Ongoing' AND bike_id = ?",
            params: [bikeId],
        };

        const queryObject3 = {
            query: "UPDATE Bike SET status = 'Locked' WHERE id = ?",
            params: [bikeId],
        };

        return await dbFuncs.promisifiedTransactionFunc([
            queryObject,
            queryObject2,
            queryObject3,
        ]);
    },
};

module.exports = {
    gatheredBikeFunctions,
};
