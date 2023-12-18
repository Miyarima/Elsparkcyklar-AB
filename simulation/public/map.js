"use strict";

// eslint-disable-next-line
let map = L.map("map").setView([56.159734, 15.587583], 15);

let markers = [];
// eslint-disable-next-line
let markerLayer = L.layerGroup().addTo(map);

// eslint-disable-next-line
let locationMarker = L.icon({
    iconUrl: "img/bikeicon.png",
    iconSize: [48, 53],
    iconAnchor: [24, 53],
});

// eslint-disable-next-line
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
}).addTo(map);

function createMarkers(coordinates) {
    coordinates.forEach((coords) => {
        // eslint-disable-next-line
        const marker = L.marker([coords[0], coords[1]], {
            icon: locationMarker,
        });
        markers.push(marker);
        markerLayer.addLayer(marker);
    });
}

function updateMapCoordinates(coordinates) {
    markerLayer.clearLayers();
    createMarkers(coordinates);
}

// eslint-disable-next-line
const socket = io.connect();

socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("updateCoordinates", function (coordinates) {
    updateMapCoordinates(coordinates);
});
