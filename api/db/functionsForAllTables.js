"use strict";
const dbFunctions = require("./databaseFunctions");

const dbFuncs = dbFunctions.gatheredDatabaseFunctions;

const functionsForAllTables = {
    /**
     * Updates on row in database
     * @async
     * @function
     * @param {Object} dataOb - object with table key, id key, and keys for rows to update and its values
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */
    oneRowUpdateTable: async (dataOb) => {
        const id = dataOb.id;
        const table = dataOb.table;
        delete dataOb.table;
        delete dataOb.id;
        let setStr = "";
        for (const key in dataOb) {
            const value =
                typeof dataOb[key] === "string"
                    ? `'${dataOb[key]}'`
                    : dataOb[key];
            setStr += ` ${key} = ${value},`;
        }
        setStr = setStr.slice(0, -1);
        const queryObject = {
            query: `UPDATE ${table} SET` + setStr + " WHERE id = ?",
            params: [id],
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },

    /**
     * Inserts row in to database
     * @async
     * @function
     * @param {Object} dataOb - object with table key, and keys for rows to insert and its values
     * @returns {Array.<Object>} An array containing objects as the result of the database query.
     */

    insertTable: async (dataOb) => {
        const table = dataOb.table;
        delete dataOb.table;
        let rowStr = "";
        let valuesStr = "";
        for (const key in dataOb) {
            const value =
                typeof dataOb[key] === "string"
                    ? `'${dataOb[key]}'`
                    : dataOb[key];
            valuesStr += `${value},`;
            rowStr += `${key},`;
        }
        rowStr = rowStr.slice(0, -1);
        valuesStr = valuesStr.slice(0, -1);
        const queryObject = {
            query: `INSERT INTO ${table} (${rowStr}) VALUES(${valuesStr})`,
        };
        return await dbFuncs.promisifiedSimpleQueryFunc(queryObject);
    },
};

module.exports = {
    functionsForAllTables,
};
