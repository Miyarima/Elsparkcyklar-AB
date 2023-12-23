"use strict";

class Bike {
    // route[1][0] LONGITUDE
    // route[1][1] LATITUDE

    // route = [
    //     [LONGITUDE, LATITUDE],
    //     [LONGITUDE, LATITUDE],
    // ];

    constructor(user, bikeId, longitude, latitude, route, zoneId, speedZones) {
        this.user = user;
        this.bikeId = bikeId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.isOn = false;
        this.status = "Available";
        this.zoneId = zoneId;
        this.speed = 0;
        this.maxSpeed = 20;
        this.distanceMoved = 0;
        this.battery = 100;
        this.charging = false;
        this.route = route;
        this.comparisonLongitude = route[1][0];
        this.comparisonLatitude = route[1][1];
        this.currentCoordinate = 1;
        this.updateInterval = null;
        this.databaseInterval = null;
        this.speedZones = speedZones;
    }

    // Changes the bike to on
    // Starts an interval of 1 sek update
    turnOn() {
        this.isOn = true;
        console.log(
            `${this.user} ${this.bikeId} ${this.longitude} ${this.latitude} is now on`,
        );

        this.createBikeInDb();

        this.updateInterval = setInterval(() => {
            this.updateBikeValues();
        }, 1000);

        this.databaseInterval = setInterval(() => {
            this.updateDb();
        }, 10000);
        return this;
    }

    // Turns the bike of and removes the interval
    turnOff() {
        this.isOn = false;
        this.currentSpeed = 0;
        console.log(
            `${this.user} ${this.bikeId} ${this.longitude} ${this.latitude} is now off`,
        );
        clearInterval(this.updateInterval);
        clearInterval(this.databaseInterval);
        return this;
    }

    // Retuns if the bike is on or off
    getStatus() {
        return this.isOn;
    }

    // Returns the bikes ID
    getBikeId() {
        return this.bikeId;
    }

    async createBikeInDb() {
        const apiKey = 1;

        try {
            await fetch(`http://localhost:8080/api/bike?apiKey=${apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    longitude: this.longitude,
                    latitude: this.latitude,
                    status: this.status,
                }),
            });
            // const data = await res.json();
            // console.log(data);
        } catch (error) {
            console.error("Error failed create bike:", error);
            return null;
        }
    }

    // Calls all needed functions for the program to work
    updateBikeValues() {
        this.randomSpeed();
        this.calculateDistance();
        this.calculateIntermediateCoordinate(this.distanceMoved);
        this.checkSpeedZone();
        // console.log(
        //     `${this.user} at ${this.longitude} ${this.latitude}, going ${this.speed} km/h and moving towards ${this.comparisonLongitude} ${this.comparisonLatitude}`,
        // );
    }

    async updateDb() {
        // console.log("hello");
        const apiKey = 1;

        try {
            await fetch(
                `http://localhost:8080/api/bike/${this.bikeId}/position?apiKey=${apiKey}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: this.bikeId,
                        longitude: this.longitude,
                        latitude: this.latitude,
                    }),
                },
            );
            // const data = await res.json();
            // console.log(data);
        } catch (error) {
            console.error("Error failed to update bike:", error);
            return null;
        }
    }

    // Returns the current coordinates for the bike
    getCoordinates() {
        return [this.longitude, this.latitude];
    }

    // returns the route assigned to the bike
    getRoute() {
        return this.route;
    }

    // Updates to the new coordinates the bike should travel towards
    updateCurrentCoordiante() {
        this.currentCoordinate += 1;
        this.comparisonLongitude = this.route[this.currentCoordinate][0];
        this.comparisonLatitude = this.route[this.currentCoordinate][1];
    }

    // Calulates the distance the bike traveled since the last update
    calculateDistance() {
        const time = 1000;
        const mps = this.speed / 3.6;

        this.distanceMoved = (time / 1000) * mps;
    }

    // Generetas a random speed for the bike based on the max allowed speed
    randomSpeed() {
        const rand = Math.random();
        const weights = Array.from({ length: this.maxSpeed + 1 }, (_, i) =>
            Math.pow(2, i),
        );
        const totalWeight = weights.reduce((acc, val) => acc + val, 0);
        const ranges = weights.map((weight) => weight / totalWeight);
        let cumulativeProbability = 0;

        for (let i = 0; i < ranges.length; i++) {
            cumulativeProbability += ranges[i];
            if (rand < cumulativeProbability) {
                this.speed = i;
                break;
            }
        }
    }

    // Check if a bike is inside of a speed zone,
    // if so limits the bike to the zones max speed
    checkSpeedZone() {
        let inZone = 0;
        const toRadians = (degrees) => (degrees * Math.PI) / 180;
        const radius = 6371000;

        this.speedZones.forEach((zone) => {
            const currLatRad = toRadians(this.latitude);
            const currLonRad = toRadians(this.longitude);
            const zoneLatRad = toRadians(zone.longitude);
            const zoneLonRad = toRadians(zone.latitude);

            const latDiff = zoneLatRad - currLatRad;
            const lonDiff = zoneLonRad - currLonRad;

            const a =
                Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                Math.cos(currLatRad) *
                    Math.cos(zoneLatRad) *
                    Math.sin(lonDiff / 2) *
                    Math.sin(lonDiff / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = radius * c;

            if (zone.radius >= distance) {
                inZone = 1;
                this.maxSpeed = zone.max_speed;
            }
        });

        if (!inZone && this.maxSpeed < 20) {
            this.maxSpeed = 20;
        }
    }

    // Calculates the new coordinates for the bike
    // based in where it's going, where it was and
    // how far it traveld since the last update
    calculateIntermediateCoordinate(distanceToMove) {
        const toRadians = (degrees) => (degrees * Math.PI) / 180;
        const toDegrees = (radians) => (radians * 180) / Math.PI;
        const startLonRad = toRadians(this.longitude);
        const startLatRad = toRadians(this.latitude);
        const endLonRad = toRadians(this.comparisonLongitude);
        const endLatRad = toRadians(this.comparisonLatitude);

        const tolerance = 0.000001;

        if (
            Math.abs(startLatRad - endLatRad) < tolerance &&
            Math.abs(startLonRad - endLonRad) < tolerance
        ) {
            if (this.currentCoordinate === this.route.length - 1) {
                this.turnOff();
            } else {
                this.updateCurrentCoordiante();
            }
        }

        const latDiff = endLatRad - startLatRad;
        const lonDiff = endLonRad - startLonRad;
        const earthRadius = 6371000;
        const a =
            Math.sin(latDiff / 2) ** 2 +
            Math.cos(startLatRad) *
                Math.cos(endLatRad) *
                Math.sin(lonDiff / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const totalDistance = earthRadius * c;

        const newLatRad =
            startLatRad + (distanceToMove / totalDistance) * latDiff;
        const newLonRad =
            startLonRad + (distanceToMove / totalDistance) * lonDiff;

        const newLat = toDegrees(newLatRad);
        const newLon = toDegrees(newLonRad);

        this.longitude = newLon.toFixed(6);
        this.latitude = newLat.toFixed(6);
    }
}

module.exports = Bike;
