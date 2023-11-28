DROP TABLE IF EXISTS `Admin`;
DROP TABLE IF EXISTS Invoice;
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
    max_speed FLOAT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES City(id)
);

CREATE TABLE Station (
    id INT PRIMARY KEY AUTO_INCREMENT,
    zone_id INT NOT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    `address` TEXT NOT NULL,
    FOREIGN KEY (zone_id) REFERENCES `Zone`(id)
);

CREATE TABLE Bike (
    id INT PRIMARY KEY AUTO_INCREMENT,
    station_id INT DEFAULT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    `status` VARCHAR(10) DEFAULT NULL,
    speed FLOAT DEFAULT 0,
    `zone_id` INT DEFAULT NULL,
    battery INT DEFAULT 100,
    charging BOOLEAN DEFAULT false,
    comparison_longitude FLOAT DEFAULT NULL,
    comparison_latitude FLOAT DEFAULT NULL,
    needs_repair BOOLEAN DEFAULT false,
    FOREIGN KEY (station_id) REFERENCES Station(id),
    FOREIGN KEY (`zone_id`) REFERENCES `Zone`(id)
);


CREATE TABLE User (
    `username` VARCHAR(100) PRIMARY KEY,
    longitude FLOAT DEFAULT NULL,
    latitude FLOAT DEFAULT NULL,
    wallet FLOAT DEFAULT 0,
    `password` TEXT DEFAULT NULL,
    `role` VARCHAR(10) DEFAULT 'User',
    email TEXT NOT NULL
);

CREATE TABLE Travel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(100),
    bike_id INT NOT NULL,
    start_longitude FLOAT NOT NULL,
    start_latitude FLOAT NOT NULL,
    end_longitude FLOAT DEFAULT NULL,
    end_latitude FLOAT DEFAULT NULL,
    distance FLOAT DEFAULT NULL,
    `time` VARCHAR (30) DEFAULT NULL,
    `status` VARCHAR(20) DEFAULT NULL,
    start_cost FLOAT DEFAULT 0,
    travel_cost FLOAT DEFAULT 0,
    total_cost FLOAT DEFAULT 0,
    FOREIGN KEY (`username`) REFERENCES User(`username`),
    FOREIGN KEY (bike_id) REFERENCES Bike(id)
);

CREATE TABLE Invoice (
    id INT PRIMARY KEY AUTO_INCREMENT,
    issue_date TEXT NOT NULL,
    `expiry_date` TEXT NOT NULL,
    paid BOOLEAN DEFAULT false,
    travel_id INT NOT NULL,
    FOREIGN KEY (travel_id) REFERENCES Travel(id)
);

CREATE TABLE `Admin` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT DEFAULT NULL,
    `password` TEXT DEFAULT NULL,
    `role` VARCHAR(10)
);










