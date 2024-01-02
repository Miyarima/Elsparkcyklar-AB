"use strict";

let map = L.map("map").setView([56.159734, 15.587583], 14);

let markerLayer = L.markerClusterGroup({ disableClusteringAtZoom: 15 });
let staticLayer = L.markerClusterGroup({ disableClusteringAtZoom: 14 });

function createIcon(url) {
    return L.icon({
        iconUrl: url,
        iconSize: [48, 53],
        iconAnchor: [24, 53],
    });
}

const bikeIcon = createIcon("img/bikeicon.png");
const parkingIcon = createIcon("img/parking.png");
const chargingIcon = createIcon("img/chargingstation.png");
const zone5Icon = createIcon("img/5.png");
const zone10Icon = createIcon("img/10.png");
const zone15Icon = createIcon("img/15.png");

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
}).addTo(map);

function createMarkers(coordinates, layer, icon) {
    coordinates.forEach((coords) => {
        const marker = L.marker([coords[0], coords[1]], {
            icon: icon,
        });
        layer.addLayer(marker);
    });
    layer.addTo(map);
}

function addCircleToMap(markerCoordinates, radius, options) {
    const { color, fillColor, fillOpacity } = options;

    const circle = L.circle(markerCoordinates, {
        radius: radius / 1.2,
        color: color,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
    });
    staticLayer.addLayer(circle);
}

function updateMapCoordinates(coordinates) {
    markerLayer.clearLayers();
    createMarkers(coordinates, markerLayer, bikeIcon);
}

function updateStaticMapCoordinates(coordinates, icon) {
    // staticLayer.clearLayers();
    createMarkers(coordinates, staticLayer, icon);
}

const socket = io.connect();

socket.on("connect", function () {
    console.log("Connected to server, with update");
});

socket.on("updateCoordinates", function (coordinates) {
    updateMapCoordinates(coordinates);
});

socket.on("updateStaticCoordinates", function (coordinates) {
    const zoneStyles = {
        charging: {
            color: "green",
            fillColor: "#2ff268",
            fillOpacity: 0.4,
        },
        parking: {
            color: "rgba(0, 50, 200, 0.5)",
            fillColor: "#11a0ff",
            fillOpacity: 0.4,
        },
        "5-zone": {
            color: "rgba(0, 0, 255, 0.5)",
            fillColor: "#3b80ff",
            fillOpacity: 0.3,
        },
        "10-zone": {
            color: "rgba(0, 0, 255, 0.5)",
            fillColor: "#3b80ff",
            fillOpacity: 0.3,
        },
        "15-zone": {
            color: "rgba(0, 0, 255, 0.5)",
            fillColor: "#3b80ff",
            fillOpacity: 0.3,
        },
    };

    const zones = {
        charging: [],
        parking: [],
        "5-zone": [],
        "10-zone": [],
        "15-zone": [],
    };

    coordinates.forEach((coords) => {
        const [x, y, zone, radius] = coords;
        zones[zone]?.push([x, y]);
        addCircleToMap([x, y], radius, zoneStyles[zone]);
    });

    updateStaticMapCoordinates(zones.charging, chargingIcon);
    updateStaticMapCoordinates(zones.parking, parkingIcon);
    updateStaticMapCoordinates(zones["5-zone"], zone5Icon);
    updateStaticMapCoordinates(zones["10-zone"], zone10Icon);
    updateStaticMapCoordinates(zones["15-zone"], zone15Icon);
});
