"use strict";

const bikes = require("../src/admin/bikes.js");
const baseURL = "http://api:8080/api";

const viewHome = async (req, res) => {
    const allBikes = await bikes.getBikes();

    console.log(allBikes);

    res.render("index.ejs", {
        title: "Admin Dashboard",
        message: "This is the Admin dashboard!",
        bikes: allBikes,
    });
};

const allCities = async (req, res, apiKey) => {
    try {
        const response = await fetch(`${baseURL}/cities?apiKey=${apiKey}`);
        const cityData = await response.json();

        //console.log(cityData);
        return cityData.cities;
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const allBikes = async (req, res, apiKey) => {
    try {
        const response = await fetch(`${baseURL}/bikes?apiKey=${apiKey}`);
        const bikeData = await response.json();

        return bikeData.bikes;
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const allCustomers = async (req, res, apiKey) => {
    try {
        const response = await fetch(`${baseURL}/users?apiKey=${apiKey}`);
        const userData = await response.json();

        return userData.users;
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const allStations = async (req, res, apiKey) => {
    try {
        const response = await fetch(`${baseURL}/cities/stations?apiKey=${apiKey}`);
        const stationData = await response.json();

        return stationData.stations;
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const specificUser = async (req, res, userId, apiKey) => {
    try {
        const response = await fetch(`${baseURL}/user/${userId}?apiKey=${apiKey}`);
        const userData = await response.json();

        return userData.users;
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateAccount = async (req, res, userId, password, email, apiKey) => {
    try {
        const response = await fetch(`http://api:8080/api/users?apiKey=${apiKey}`);
        const allUsers = await response.json();

        if (!allUsers.users.some(user => user.email === email) || password !== "") {
            var updateAccount =
            {
                username: userId,
                email: email,
                password: password,
            };

            await fetch(`${baseURL}/user?apiKey=${apiKey}`, {
                body: JSON.stringify(updateAccount),
                headers: {
                    "content-type": "application/json"
                },
                method: "PUT"
            });

            console.log("account updated!");
            return;
        }

        console.error("Email already in use, has to be unique.");
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const filteredCity = async (cityName, apiKey) => {
    const cityResponse = await fetch(`${baseURL}/cities?apiKey=${apiKey}`);
    const cityData = await cityResponse.json();

    const selectedCity = cityData.cities.find(city => city.name === cityName);

    return selectedCity;
};

const filteredStations = async (cityName, apiKey) => {
    const stationsResponse = await fetch(`${baseURL}/cities/stations?apiKey=${apiKey}`);
    const stationsData = await stationsResponse.json();

    const selectedStations = stationsData.stations.filter(city => city.address.includes(cityName));

    return selectedStations;
};

const allZones = async (req, res, apiKey) => {
    try {
        const zonesResponse = await fetch(`${baseURL}/cities/zones?apiKey=${apiKey}`);
        const zonesData = await zonesResponse.json();

        return zonesData.zones;
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getSpecificCity = async (req, res, cityName, apiKey) => {
    try {
        // Gets all Zones
        const zonesData = await allZones(apiKey);
        
        // Gets all bikes
        const bikesData = await allBikes(apiKey);

        // Filter based on city
        const selectedCity = await filteredCity(cityName, apiKey);

        // Filter stations based on city
        const selectedStations = await filteredStations(cityName, apiKey); 

        // Slice longitude and latitude for cities
        const referenceLongitudePrefix = String(selectedCity.longitude).slice(0, 2);
        const referenceLatitudePrefix = String(selectedCity.latitude).slice(0, 2);

        // Filter bikes based on city longitude and latitude
        const filteredBikes = bikesData.filter(bike => {
            const bikeLongitudePrefix = String(bike.longitude).slice(0, 2);
            const bikeLatitudePrefix = String(bike.latitude).slice(0, 2);
            return (
                bikeLongitudePrefix === referenceLongitudePrefix &&
              bikeLatitudePrefix === referenceLatitudePrefix
            );
        });

        // Filtered zones based on city longitude and latitude
        const filteredZones = zonesData.filter(zone => {
            const zoneLongitudePrefix = String(zone.longitude).slice(0, 2);
            const zoneLatitudePrefix = String(zone.latitude).slice(0, 2);
            return (
                zoneLongitudePrefix === referenceLongitudePrefix &&
              zoneLatitudePrefix === referenceLatitudePrefix
            );
        });

        return { cities: selectedCity, stations: selectedStations, zones: filteredZones, bikes: filteredBikes };
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateStationBike = async (req, res, bikeId, stationId, apiKey) => {
    try {
        let selectedId;

        const stations = await allStations(apiKey);

        if (Array.isArray(stationId)) {
            selectedId = stationId.filter(item => item !== "").map(item => parseInt(item, 10));
        } else {
            selectedId = [stationId].filter(item => item !== "").map(item => parseInt(item, 10));
        }

        const selectedStations = stations.filter(station => selectedId.includes(station.id));

        var updateBike =
            {
                bikeId: bikeId,
                longitude: selectedStations[0].longitude,
                latitude: selectedStations[0].latitude,
                stationId: selectedStations[0].id,
            };
        
        await fetch(`${baseURL}/bike/${bikeId}/station?apiKey=${apiKey}`, {
            body: JSON.stringify(updateBike),
            headers: {
                "content-type": "application/json"
            },
            method: "PUT"
        });
            
            
        console.log("Bike updated");
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    viewHome,
    allCities,
    allBikes,
    allCustomers,
    allStations,
    specificUser,
    updateAccount,
    getSpecificCity,
    allZones,
    updateStationBike,
};
