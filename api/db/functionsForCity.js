"use strict";
const dbFunctions = require("./databaseFunctions");

const dbFuncs = dbFunctions.gatheredDatabaseFunctions;

const gatheredCityFunctions = {
    /**
     * Selects all cities
     * @async
     * @function
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    selectAllCities: async () => {
        const queryObject = {
            query: "SELECT * FROM City",
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    selectAllZones: async () => {
        const queryObject = {
            query: "SELECT * FROM Zone",
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    selectAllStations: async () => {
        const queryObject = {
            query: "SELECT * FROM Station",
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Selects available ports for station
     * @async
     * @function
     * @param {int} stationId stationId
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    availablePortsForStation: async (stationId) => {
        const queryObject = {
            query: "SELECT * FROM Port WHERE station_id = ?",
            params: [stationId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Selects specific city.
     * @async
     * @function
     * @param {int} cityId cityId
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    specificCity: async (cityId) => {
        const queryObject = {
            query: "SELECT * FROM City WHERE id = ?",
            params: [cityId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * All bikes and the city it belongs to
     * @async
     * @function
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    allBikesAndItsCities: async () => {
        const queryObject = {
            query: "SELECT b.*, c.name FROM Bike b LEFT JOIN City c ON b.id = c.id",
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * All bikes and the city it belongs to
     * @async
     * @function
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    bikesAttachedToStation: async (stationId) => {
        const queryObject = {
            query: "SELECT b.id, b.charging, b.battery, b.status, s.id, s.`address`,p.id FROM Bike b RIGHT JOIN Port p ON b.id = p.bike_id LEFT JOIN Station s ON p.station_id = s.id WHERE s.id = ?",
            params: [stationId], // You can add parameters here if needed
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },
};

module.exports = {
    gatheredCityFunctions,
};
