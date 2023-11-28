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

DROP PROCEDURE IF EXISTS get_zones_in_city;

DELIMITER ;;

CREATE PROCEDURE get_zones_in_city(
    IN city_in VARCHAR(50)
)
BEGIN
    SELECT z.*, c.`name`, c.id FROM `Zone` z
    LEFT JOIN City c ON  z.city_id = c.id
    WHERE z.city_id = city_in OR c.`name` = city_in;
END ;;

DELIMITER ;


DROP PROCEDURE IF EXISTS get_all_zones;

DELIMITER ;;

CREATE PROCEDURE get_all_zones()
BEGIN
    SELECT * FROM `Zone`;
END ;;

DELIMITER ;
