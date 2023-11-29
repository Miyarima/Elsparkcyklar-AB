"use strict";

// Vi gör något rikigt med api nycklen sen, har bara den så länge
const apiKey = 1;

const getBikes = async () => {
    // Om man ska köra i Docker: http://api:8080/api/bikes?apiKey=1
    // Om man ska köra localt så blir länken: http://localhost:8080/api/bikes?apiKey=1
    const response = await fetch(`http://api:8080/api/bikes?apiKey=${apiKey}`);
    const result = await response.json();

    return result;
};

module.exports = {
    getBikes,
};
