const Bike = require("./bike.js");
const routes = require("./route.js");
const firstNames = require("./names.js").firstNames;
const lastNames = require("./names.js").lastNames;

const generateBikesAndUsers = (count) => {
    let bikes = [];

    for (let i = 0; i < count; i++) {
        const route = routes[Math.floor(Math.random() * routes.length)];
        bikes.push(createBike(i, route[0][0], route[0][1], route));
    }

    bikes.forEach((bike) => {
        bike.turnOn();
        bike.getCoordinates();
        bike.getRoute();
    });

    return bikes;
};

const createBike = (bikeId, long, lat, route) => {
    const randomFirstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
        lastNames[Math.floor(Math.random() * lastNames.length)];
    const myBike = new Bike(
        `${randomFirstName} ${randomLastName}`,
        bikeId,
        long,
        lat,
        route,
        5,
    );

    return myBike;
};

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

    fetch("http://localhost:3000/update-map", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ coordinates }),
    });
};

const totalBikes = generateBikesAndUsers(3000);
let reachedDestination = [];

const updateBikes = setInterval(() => {
    console.log(
        `dest: ${reachedDestination.length}, bikes: ${totalBikes.length}`,
    );
    if (reachedDestination.length === totalBikes.length) {
        clearInterval(updateBikes);
    }
    sendMapUpdates(totalBikes);
}, 1000);
