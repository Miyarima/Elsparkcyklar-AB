const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// eslint-disable-next-line
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "public", "index.html"));
    res.render("index.hmtl");
});

app.post("/update-map", (req, res) => {
    const { coordinates } = req.body;

    console.log(coordinates);

    if (coordinates) {
        res.status(200).send("Coordinates received");
        io.emit("updateCoordinates", coordinates);
    } else {
        res.status(400).send("Invalid coordinates");
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const io = require("socket.io")(server);

// eslint-disable-next-line
io.on("connection", (socket) => {
    console.log("Client connected");
});
