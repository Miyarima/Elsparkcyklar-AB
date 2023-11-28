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

DROP PROCEDURE IF EXISTS get_bikes_attached_to_specific_station;
DELIMITER ;;


CREATE PROCEDURE get_bikes_attached_to_specific_station(
    IN station_in VARCHAR(100)
)
BEGIN
    SELECT b.id AS `bike_id`, b.charging AS `bike_charging`,
    b.battery AS `bike_battery` ,b.status AS `bike_status`,
    s.id AS `station_id`,s.`address` AS `station_address` FROM Bike b 
    RIGHT JOIN
        Station s ON b.station_id = s.id
    WHERE s.id = station_in;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS get_stations_in_zone;

DELIMITER ;;

CREATE PROCEDURE get_stations_in_zone(
    IN zone_id_in INT
)
BEGIN
    SELECT * FROM Station WHERE zone_id = zone_id_in;
END ;;

DELIMTER ;

DROP PROCEDURE IF EXISTS get_station_from_address;

DELIMITER ;;

CREATE PROCEDURE get_station_from_address
(IN 
    address_in TEXT
)
BEGIN
    SELECT * FROM Station WHERE `address` = address_in;
END ;; 

DELIMITER ;
