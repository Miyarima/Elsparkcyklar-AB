"use strict";

let map = L.map("map").setView([56.159734, 15.587583], 15);

let markers = [];
let markerLayer = L.layerGroup().addTo(map);

let locationMarker = L.icon({
    iconUrl: "img/bikeicon.png",
    iconSize: [48, 53],
    iconAnchor: [24, 53],
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function createMarkers(coordinates) {
    coordinates.forEach((coords) => {
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

const socket = io.connect();

socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("updateCoordinates", function (coordinates) {
    updateMapCoordinates(coordinates);
});
