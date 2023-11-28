
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


DROP PROCEDURE IF EXISTS select_bike_from_travel;
DELIMITER ;;

CREATE PROCEDURE select_bike_from_travel(
    IN travel_id_in INT,
    IN status_in VARCHAR(20)
)
BEGIN
    SELECT b.* FROM Travel t
    LEFT JOIN Bike b ON t.bike_id = b.id 
    WHERE t.id = travel_id_in AND t.`status` = status_in;
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



DROP PROCEDURE IF EXISTS change_repair_status;
DELIMITER ;;

CREATE PROCEDURE change_repair_status(
    IN bike_id_in INT,
    IN repair_status_in BOOLEAN
)
    BEGIN
    UPDATE Bike
    SET repair_status = repair_status_in
    WHERE id = bike_id_in;
    END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS all_bikes_with_repair_status;
DELIMITER ;;
CREATE PROCEDURE all_bikes_with_repair_status(
    IN repair_status BOOLEAN
)
    BEGIN
    SELECT id,repair_status FROM Bike WHERE needs_repair = repair_status;
    END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS change_bike_position;
DELIMITER ;;
CREATE PROCEDURE change_bike_position(
    IN bike_id_in INT,
    IN longitude_in FLOAT,
    IN latitude_in FLOAT
)
    BEGIN
    UPDATE Bike
    SET longitude = longitude_in, latitude = latitude_in
    WHERE id = bike_id_in;
    END ;;

DELIMITER ;


DELIMITER ;

DROP PROCEDURE IF EXISTS change_bike_speed;
DELIMITER ;;
CREATE PROCEDURE change_bike_speed(
    IN bike_id_in INT,
    IN speed_in FLOAT
)
    BEGIN
    UPDATE Bike
    SET speed = speed_in
    WHERE id = bike_id_in;
    END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS change_bike_zone_id;
DELIMITER ;;
CREATE PROCEDURE change_bike_zone_id(
    IN bike_id_in INT,
    IN zone_id_in INT
)
    BEGIN
    UPDATE Bike
    SET zone_id = zone_id_in
    WHERE id = bike_id_in;
    END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS change_bike_battery;
DELIMITER ;;
CREATE PROCEDURE change_bike_battery(
    IN bike_id_in INT,
    IN battery_in INT
)
    BEGIN
    UPDATE Bike
    SET battery = battery_in
    WHERE id = bike_id_in;
    END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS change_charging_bool;
DELIMITER ;;
CREATE PROCEDURE change_charging_bool(
    IN bike_id_in INT,
    IN charging_in FLOAT
)
    BEGIN
    UPDATE Bike
    SET charging = charging_in
    WHERE id = bike_id_in;
    END ;;

DELIMITER ; 

DROP PROCEDURE IF EXISTS change_comparison_position;

DELIMITER ;;
CREATE PROCEDURE change_comparison_position(
    IN bike_id_in INT,
    IN latest_longitude_in FLOAT,
    IN latest_latitude_in FLOAT
)
    BEGIN
    UPDATE Bike
    SET latest_longitude = latest_longitude_in,
    latest_latitude = latest_latitude_in
    WHERE id = bike_id_in;
    END ;;

DELIMITER ; 

