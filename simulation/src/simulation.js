const Bike = require("./bike.js");
const routes = require("./route.js");
const firstNames = require("./names.js").firstNames;
const lastNames = require("./names.js").lastNames;
const fth = require("./fetch.js");

// Returns a random element from the provided array
const random = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

// Generets a bike with the given values
const createBike = async (bikeId, userId, long, lat, route) => {
    const name = `${random(firstNames)}_${random(lastNames)}${userId}`;

    await fth.createUser({
        username: name,
        password: "test",
        email: `simuser${userId}@test.com`,
        wallet: 10000,
    });

    const myBike = new Bike(name, bikeId, long, lat, route, zones);

    return myBike;
};

// Generates the amount of bikes asked for
// and retuns in an array
const generateBikesAndUsers = async (count) => {
    let bikes = [];
    // Bikes already in the DB and the Id starts at 1
    const firstBike = await fth.fetchBikes();
    const firstUser = await fth.fetchUsers();

    for (let i = 0; i < count; i++) {
        const route = routes[Math.floor(Math.random() * routes.length)];
        bikes.push(
            await createBike(
                i + firstBike.length + 1,
                i + firstUser.length + 1,
                route[0][0],
                route[0][1],
                route,
            ),
        );
    }

    bikes.forEach(async (bike) => {
        bike.turnOn();
        const bikeId = bike.getBikeId();
        const name = bike.getUserId();
        console.log(`${name} renting ${bikeId}`);
        const res = await fth.rentBike(bikeId, name);
        console.log(res);
    });

    return bikes;
};

// Send all static objects to the map
const initStaticStructures = async () => {
    stations = await fth.fetchStations();
    zones = await fth.fetchZones();

    let coordinates = [];

    stations.forEach((station) => {
        coordinates.push([
            station.latitude,
            station.longitude,
            "chargingstation",
            10,
        ]);
    });

    zones.forEach((zone) => {
        let speed = "5-zone";

        if (zone.max_speed !== 5) {
            speed = zone.max_speed === 10 ? "10-zone" : "15-zone";
        }

        coordinates.push([zone.latitude, zone.longitude, speed, zone.radius]);
    });

    fth.sendStaticElements(coordinates);
};

// Periodically sends all moving objects as
// an update to the map
const sendMapUpdates = (bikes) => {
    let coordinates = [];
    bikes.forEach((bike) => {
        const coords = bike.getCoordinates();
        coordinates.push([coords[0], coords[1]]);
        if (!bike.getStatus()) {
            const bikeId = bike.getBikeId();
            if (!reachedDestination.includes(bikeId)) {
                reachedDestination.push(bikeId);
            }
        }
    });

    fth.sendBikeUpdate(coordinates);
};

// Removes the bikes from the db
// const clearDb = (bikes) => {
//     bikes.forEach((bike) => {
//         fth.deleteBike(bike.getBikeId());
//         fth.deleteUser(bike.getUserId());
//     });
// };

async function init(count) {
    await initStaticStructures();
    const totalBikes = await generateBikesAndUsers(count);

    // Clears the interval which is automatically
    // sending updates to the map
    const updateBikes = setInterval(() => {
        console.log(
            `dest: ${reachedDestination.length}, bikes: ${totalBikes.length}`,
        );
        if (reachedDestination.length === totalBikes.length) {
            clearInterval(updateBikes);
            // clearDb(totalBikes);
        }
        sendMapUpdates(totalBikes);
    }, 1000);
}

let stations;
let zones;
let reachedDestination = [];

// amount of bikes
init(1);
