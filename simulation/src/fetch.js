"use strict";

const apiKey = 1;

const fetchStations = async () => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/cities/stations?apiKey=${apiKey}`,
        );
        const res = await response.json();
        return res.stations;
    } catch (error) {
        console.error("Error fetching cities:", error);
        return null;
    }
};

const fetchZones = async () => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/cities/zones?apiKey=${apiKey}`,
        );
        const res = await response.json();
        return res.zones;
    } catch (error) {
        console.error("Error fetching cities:", error);
        return null;
    }
};

module.exports = { fetchStations, fetchZones };
