DROP PROCEDURE IF EXISTS get_city;
DELIMITER ;;
CREATE PROCEDURE get_city(
    IN longitude_in FLOAT,
    IN latitude_in FLOAT
)
BEGIN
    SELECT * FROM City WHERE longitude = longitude_in AND latitude = latitude_in;
END ;;

DELIMITER ; 