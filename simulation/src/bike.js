"use strict";

class Bike {
    // route[1][0] LONGITUDE
    // route[1][1] LATITUDE

    // route = [
    //     [LONGITUDE, LATITUDE],
    //     [LONGITUDE, LATITUDE],
    // ];

    constructor(user, bikeId, longitude, latitude, route, zoneId) {
        this.user = user;
        this.bikeId = bikeId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.isOn = false;
        this.status = "stationary";
        this.zoneId = zoneId;
        this.speed = 0;
        this.maxSpeed = 25;
        this.distanceMoved = 0;
        this.battery = 100;
        this.charging = false;
        this.route = route;
        this.comparisonLongitude = route[1][0];
        this.comparisonLatitude = route[1][1];
        this.currentCoordinate = 1;
        this.updateInterval = null;
    }

    turnOn() {
        this.isOn = true;
        console.log(
            `${this.user} ${this.bikeId} ${this.longitude} ${this.latitude} is now on`,
        );
        this.updateInterval = setInterval(() => {
            this.updateDb();
        }, 1000);
        return this;
    }

    turnOff() {
        this.isOn = false;
        this.currentSpeed = 0;
        console.log(
            `${this.user} ${this.bikeId} ${this.longitude} ${this.latitude} is now off`,
        );
        clearInterval(this.updateInterval);
        return this;
    }

    getStatus() {
        return this.isOn;
    }

    getBikeId() {
        return this.bikeId;
    }

    updateDb() {
        // console.log(
        //     `Sending update about ${this.user} ${this.bikeId} to the database`,
        // );
        this.randomSpeed();
        this.calculateDistance();
        this.calculateIntermediateCoordinate(this.distanceMoved);
        // this.sendUpdateToMap();
        // console.log(
        //     `${this.user} at ${this.longitude} ${this.latitude}, going ${this.speed} km/h and moving towards ${this.comparisonLongitude} ${this.comparisonLatitude}`,
        // );
    }

    getCoordinates() {
        return [this.longitude, this.latitude];
        // console.log([this.longitude, this.latitude]);
    }

    getRoute() {
        // return this.route;
        console.log(this.route);
    }

    updateCurrentCoordiante() {
        this.currentCoordinate += 1;
        this.comparisonLongitude = this.route[this.currentCoordinate][0];
        this.comparisonLatitude = this.route[this.currentCoordinate][1];
    }

    calculateDistance() {
        const time = 1000;
        const mps = this.speed / 3.6;

        this.distanceMoved = (time / 1000) * mps;
    }

    randomSpeed() {
        const rand = Math.random();
        const weights = Array.from({ length: 21 }, (_, i) => Math.pow(2, i));
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
