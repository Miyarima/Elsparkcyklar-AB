"use strict";
const { dbFunctions } = require("./databaseFunctions");

const dbFuncs = dbFunctions.gatheredDatabaseFunctions;

const gatheredCityFunctions = {
    selectAllCities: async () => {
        const queryObject = {
            query: "SELECT * FROM City",
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    availablePortsForStation: async (stationId) => {
        const queryObject = {
            query: "SELECT * FROM Port WHERE station_id = ?",
            params: [stationId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    specificCity: async (cityId) => {
        const queryObject = {
            query: "SELECT * FROM City WHERE id = ?",
            params: [cityId],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    allBikesAndItsCities: async () => {
        const queryObject = {
            query: "SELECT b.*, c.name FROM Bike b LEFT JOIN City c ON b.id = c.id",
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    bikesAttachedToStation: async () => {
        const queryObject = {
            query: "SELECT b.id, b.charging, b.battery, b.status, s.id, s.`address`,p.id FROM Bike b RIGHT JOIN Port p ON b.id = p.bike_id LEFT JOIN Station s ON p.station_id = s.id",
            params: [], // You can add parameters here if needed
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },
};

module.exports = {
    gatheredCityFunctions,
};
