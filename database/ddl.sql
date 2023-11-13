DROP TABLE IF EXISTS `Admin`;
DROP TABLE IF EXISTS Travel;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Bike;
DROP TABLE IF EXISTS Station;
DROP TABLE IF EXISTS `Zone`;
DROP TABLE IF EXISTS City;


CREATE TABLE City (
    id INT PRIMARY KEY AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL
);

CREATE TABLE `Zone` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    city_id INT NOT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES City(id)
);

CREATE TABLE Station (
    id INT PRIMARY KEY AUTO_INCREMENT,
    city_id INT NOT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    `address` TEXT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES City(id)
);

CREATE TABLE Bike (
    id INT PRIMARY KEY AUTO_INCREMENT,
    station_id INT DEFAULT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    `status` VARCHAR(10) DEFAULT NULL,
    speed FLOAT DEFAULT 0,
    battery INT DEFAULT 100,
    charging BOOLEAN DEFAULT false,
    FOREIGN KEY (station_id) REFERENCES Station(id)
);


CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    wallet FLOAT DEFAULT NULL,
    username TEXT DEFAULT NULL,
    `password` TEXT DEFAULT NULL,
    `role` VARCHAR(10),
    email TEXT NOT NULL
);

CREATE TABLE Travel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    bike_id INT NOT NULL,
    start_longitude FLOAT NOT NULL,
    start_latitude FLOAT NOT NULL,
    end_longitude FLOAT DEFAULT NULL,
    end_latitude FLOAT DEFAULT NULL,
    distance FLOAT DEFAULT NULL,
    speed FLOAT DEFAULT 0,
    speed_limit FLOAT DEFAULT 20,
    `status` VARCHAR(10) DEFAULT NULL,
    start_cost FLOAT NOT NULL,
    travel_cost FLOAT NOT NULL,
    total_cost FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (bike_id) REFERENCES Bike(id)
);


CREATE TABLE `Admin` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT DEFAULT NULL,
    `password` TEXT DEFAULT NULL,
    `role` VARCHAR(10)
);
