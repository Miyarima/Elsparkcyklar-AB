DROP PROCEDURE IF EXISTS insert_travel;
DELIMITER ;;

CREATE PROCEDURE insert_travel(IN
bike_id_in INT,
IN username_in VARCHAR(100),
IN start_longitude_in FLOAT,
IN start_latitude_in FLOAT,
IN status_in VARCHAR(20))
BEGIN
    INSERT INTO Travel(bike_id, `username`, start_longitude, start_latitude, `status`)
    VALUES
    (bike_id_in, username_in, start_longitude_in, start_latitude_in, status_in);
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS travel_status_select;
DELIMITER ;;
CREATE PROCEDURE travel_status_select(
    IN status_in VARCHAR(20)
)
BEGIN
    SELECT t.*, b.longitude, b.latitude, b.battery, b.speed FROM Travel t
    RIGHT JOIN Bike b ON t.bike_id = b.id
    WHERE t.`status` = status_in;
END ;;
DELIMITER ;


DROP PROCEDURE IF EXISTS update_travel_status;
DELIMITER ;;

CREATE PROCEDURE update_travel_status(
    IN status_in VARCHAR(20),
    IN travel_id_in INT
)
BEGIN
    UPDATE Travel
    SET `status` = status_in
    WHERE id = travel_id_in;
END ;; 

DELIMITER ;

DROP PROCEDURE IF EXISTS select_travel_for_user;

DELIMITER ;;

CREATE PROCEDURE select_travel_for_user(
    IN username_in VARCHAR(100)
)
BEGIN
    SELECT * FROM Travel WHERE `username` = username_in;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS select_travel_for_bike;

DELIMITER ;;

CREATE PROCEDURE select_travel_for_bike(
    IN bike_id_in INT
)
BEGIN
    SELECT * FROM Travel WHERE bike_id = bike_id_in;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS select_all_travels;

DELIMITER ;;

CREATE PROCEDURE select_all_travels()
BEGIN
    SELECT * FROM Travel;
END ;;

DELIMITER ;


DROP PROCEDURE IF EXISTS end_travel;

DELIMITER ;;

CREATE PROCEDURE end_travel(
    IN travel_id_in INT,
    IN end_longitude_in FLOAT,
    IN end_latitude_in FLOAT,
    IN travel_cost_in FLOAT,
    IN distance_in FLOAT,
    IN time_in VARCHAR(30)
)
BEGIN
    UPDATE Travel
    SET end_longitude = end_longitude_in,
    end_latitude = end_latitude_in,
    travel_cost = travel_cost_in,
    total_cost = travel_cost_in + start_cost,
    distance = distance_in,
    `time` = time_in
    WHERE id = travel_id_in;
END ;;

DELIMITER ;


