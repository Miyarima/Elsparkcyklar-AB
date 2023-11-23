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
    max_speed FLOAT NOT NULL,
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
    `zone_id` INT DEFAULT NULL,
    battery INT DEFAULT 100,
    charging BOOLEAN DEFAULT false,
    comparison_longitude1 FLOAT DEFAULT NULL,
    comparison_latitude1 FLOAT DEFAULT NULL,
    comparison_longitude2 FLOAT DEFAULT NULL,
    comparison_latitude2 FLOAT DEFAULT NULL,
    FOREIGN KEY (station_id) REFERENCES Station(id),
    FOREIGN KEY (`zone_id`) REFERENCES `Zone`(id)
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
    `status` VARCHAR(10) DEFAULT NULL,
    start_cost FLOAT DEFAULT 0,
    travel_cost FLOAT DEFAULT 0,
    total_cost FLOAT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (bike_id) REFERENCES Bike(id)
);


CREATE TABLE `Admin` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT DEFAULT NULL,
    `password` TEXT DEFAULT NULL,
    `role` VARCHAR(10)
);



DROP PROCEDURE IF EXISTS max_speed_for_bike;
DELIMITER ;;

CREATE PROCEDURE max_speed_for_bike(IN 
bike_id INT)
BEGIN
    SELECT b.speed AS `speed`, z.id AS `zone_id`, z.max_speed AS `max_speed_in_zone` FROM Bike b 
    LEFT JOIN
        `Zone` z ON b.zone_id = z.id
    WHERE b.id = bike_id;
END ;;

DELIMITER ;


DROP PROCEDURE IF EXISTS all_bikes;
DELIMITER ;;

CREATE PROCEDURE all_bikes()
BEGIN
    SELECT * FROM Bike;
END ;;

DELIMITER ;


DROP PROCEDURE IF EXISTS one_bike;
DELIMITER ;;

CREATE PROCEDURE one_bike(IN 
bike_id INT)
BEGIN
    SELECT * FROM Bike;
END ;;



DELIMITER ;

DROP PROCEDURE IF EXISTS get_bikes_attached_to_stations;
DELIMITER ;;

CREATE PROCEDURE get_bikes_attached_to_stations()
BEGIN
    SELECT b.id AS `bike_id`, b.charging AS `bike_charging`,
    b.battery AS `bike_battery` ,b.status AS `bike_status`,
    s.id AS `station_id`,s.`address` AS `station_address` FROM Bike b 
    RIGHT JOIN
        Station s ON b.station_id = s.id;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS get_bikes_in_zones;
DELIMITER ;;

CREATE PROCEDURE get_bikes_in_zones()
BEGIN
    SELECT b.id AS `bike_id`, b.status AS `bike_status`, b.speed as `bike_speed`
    ,z.id AS `zone_id`, z.city_id AS `city`, z.longitude AS `zone_longitude`,
    z.latitude AS `zone_latitude`FROM Bike b
    RIGHT JOIN
        `Zone` z ON b.zone_id = z.id;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS change_bike_status;
DELIMITER ;;

CREATE PROCEDURE change_bike_status(IN
bike_id INT,
status_in VARCHAR(10))
BEGIN
    UPDATE Bike
    SET `status` = status_in
    WHERE id = bike_id;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS create_travel;
DELIMITER ;;

CREATE PROCEDURE create_travel(IN
bike_id_in INT,
user_id_in INT,
start_longitude_in FLOAT,
start_latitude_in FLOAT)
BEGIN
    INSERT INTO Travel(bike_id, user_id, start_longitude, start_latitude)
    VALUES
    (bike_id_in, user_id_in, start_longitude_in, start_latitude_in);
END ;;

DELIMITER ;



DROP PROCEDURE IF EXISTS unlock_bike;
DELIMITER ;;

CREATE PROCEDURE unlock_bike(IN
bike_id_in INT,
user_id_in INT)
BEGIN
    DECLARE start_longitude_val FLOAT;
    DECLARE start_latitude_val FLOAT;
    START TRANSACTION;
    SELECT start_longitude, start_latitude
    INTO start_longitude_val, start_latitude_val
    FROM Bike
    WHERE id = bike_id_in;
    CALL create_travel(bike_id_in, user_id_in, start_longitude_val, start_latitude_val);
    CALL change_bike_status(bike_id_in, 'Unlocked');
    COMMIT;
END ;;

DELIMITER ;






