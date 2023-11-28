"use strict";

// Vi gör något rikigt med api nycklen sen, har bara den så länge
const apiKey = 1;

const getBikes = async () => {
    const response = await fetch(
        `http://localhost:8080/api/bikes?apiKey=${apiKey}`
    );
    const result = await response.json();

    return result;
};

module.exports = {
    getBikes,
};
