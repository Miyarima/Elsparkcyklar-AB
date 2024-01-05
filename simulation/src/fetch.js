"use strict";

const apiKey = 1;

const fetchUsers = async () => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/v1/users?apiKey=${apiKey}`,
        );
        const res = await response.json();
        return res.users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
};

const createUser = async (user) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/v1/user?apiKey=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            },
        );
        const res = await response.json();
        return res.bikes;
    } catch (error) {
        console.error("Error fetching cities:", error);
        return null;
    }
};

// const deleteUser = async (id) => {
//     try {
//         const response = await fetch(
//             `http://localhost:8080/api/user/${id}?apiKey=${apiKey}`,
//             {
//                 method: "Delete",
//             },
//         );
//         const res = await response.json();
//         return res.bikes;
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         return null;
//     }
// };

const fetchBikes = async () => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/v1/bikes?apiKey=${apiKey}`,
        );
        const res = await response.json();
        return res.bikes;
    } catch (error) {
        console.error("Error fetching cities:", error);
        return null;
    }
};

const rentBike = async (bikeId, userId) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/v1/bike/${bikeId}/${userId}/rent?apiKey=${apiKey}`,
            {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const res = await response.json();
        return res;
    } catch (error) {
        console.error("Error renting bike:", error);
        return null;
    }
};

// const deleteBike = async (id) => {
//     try {
//         const response = await fetch(
//             `http://localhost:8080/api/v1/bike/${id}?apiKey=${apiKey}`,
//             {
//                 method: "Delete",
//             },
//         );
//         const res = await response.json();
//         return res.bikes;
//     } catch (error) {
//         console.error("Error deleting bike:", error);
//         return null;
//     }
// };

const fetchStations = async () => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/v1/cities/stations?apiKey=${apiKey}`,
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
            `http://localhost:8080/api/v1/cities/zones?apiKey=${apiKey}`,
        );
        const res = await response.json();
        return res.zones;
    } catch (error) {
        console.error("Error fetching cities:", error);
        return null;
    }
};

const sendStaticElements = (coordinates) => {
    try {
        fetch("http://localhost:3000/update-map-static", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ coordinates }),
        });
    } catch (error) {
        console.error("Error sending static update", error);
        return null;
    }
};

const sendBikeUpdate = (coordinates) => {
    try {
        fetch("http://localhost:3000/update-map", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ coordinates }),
        });
    } catch (error) {
        console.error("Error sending bike update", error);
        return null;
    }
};

module.exports = {
    fetchUsers,
    createUser,
    fetchBikes,
    rentBike,
    fetchStations,
    fetchZones,
    sendStaticElements,
    sendBikeUpdate,
};
