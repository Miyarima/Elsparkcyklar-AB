const { functionsForAllTables } = require("./functionsForAllTables");
const { gatheredBikeFunctions } = require("./functionsForBike");
const { gatheredCityFunctions } = require("./functionsForCity");
const { gatheredUserFunctions } = require("./functionsForUser");

module.exports = {
    gatheredUserFunctions,
    gatheredCityFunctions,
    gatheredBikeFunctions,
    functionsForAllTables,
};
