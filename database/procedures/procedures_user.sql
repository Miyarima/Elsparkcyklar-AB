DROP PROCEDURE IF EXISTS select_all_users;

DELIMITER ;;

CREATE PROCEDURE select_all_users()
BEGIN
    SELECT * FROM User;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS select_specific_user;

DELIMITER ;;

CREATE PROCEDURE select_select_specific_user(
    IN username_in VARCHAR(100)
)
BEGIN
    SELECT * FROM User
    WHERE `username` = username_in;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS insert_user;

DELIMITER ;;

CREATE PROCEDURE insert_user(
    IN username_in VARCHAR(100),
    IN email_in TEXT,
    IN password_in TEXT DEFAULT NULL
)
BEGIN
    INSERT INTO User(`username`, email_in, password_in)
    VALUES(username_in, email_in, password_in);
END ;;

DELIMITER ;


DROP PROCEDURE IF EXISTS update_wallet_for_user;

DELIMITER ;;

CREATE PROCEDURE insert_user(
    IN username_in VARCHAR(100),
    IN balance_change FLOAT
)
BEGIN
    UPDATE User
    SET wallet = wallet + balance_change
    WHERE `username` = username_in;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS update_position_user;

DELIMITER ;;

CREATE PROCEDURE update_position_user(
    IN username_in VARCHAR(100),
    IN longitude_in FLOAT,
    IN latitude_in FLOAT
)
BEGIN
    UPDATE User
    SET longitude = longitude_in,
    latitude = latitude_in
    WHERE `username` = username_in;
END ;;

DELIMITER ;