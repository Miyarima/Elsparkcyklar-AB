DROP FUNCTION IF EXISTS in_lager;
DROP FUNCTION IF EXISTS order_status;

DROP PROCEDURE IF EXISTS delete_product;
DROP PROCEDURE IF EXISTS update_order_status_shipped;
DROP PROCEDURE IF EXISTS update_order_status_orderd;
DROP PROCEDURE IF EXISTS update_amount;
DROP PROCEDURE IF EXISTS insert_amount;
DROP PROCEDURE IF EXISTS update_product;
DROP PROCEDURE IF EXISTS picklist;
DROP PROCEDURE IF EXISTS search_orders;
DROP PROCEDURE IF EXISTS show_order_overview;
DROP PROCEDURE IF EXISTS show_orders;
DROP PROCEDURE IF EXISTS show_info_product;
DROP PROCEDURE IF EXISTS create_shelf_row;
DROP PROCEDURE IF EXISTS create_order_row;
DROP PROCEDURE IF EXISTS create_order;
DROP PROCEDURE IF EXISTS add_product_categories;
DROP PROCEDURE IF EXISTS add_product;
DROP PROCEDURE IF EXISTS search_inventory;
DROP PROCEDURE IF EXISTS show_inventory;
DROP PROCEDURE IF EXISTS show_log;
DROP PROCEDURE IF EXISTS show_products_limited;
DROP PROCEDURE IF EXISTS show_order_products;
DROP PROCEDURE IF EXISTS show_products_amount;
DROP PROCEDURE IF EXISTS show_products;
DROP PROCEDURE IF EXISTS show_order;
DROP PROCEDURE IF EXISTS show_customer;
DROP PROCEDURE IF EXISTS show_shelves;
DROP PROCEDURE IF EXISTS show_category;

DROP TRIGGER IF EXISTS generate_invoice;
DROP TRIGGER IF EXISTS log_product_insert;
DROP TRIGGER IF EXISTS log_product_update;
DROP TRIGGER IF EXISTS log_product_delete;

DROP TABLE IF EXISTS `account_log`;
DROP TABLE IF EXISTS `hylla_rader`;
DROP TABLE IF EXISTS `kategori_rader`;
DROP TABLE IF EXISTS `order_rader`;
DROP TABLE IF EXISTS `log`;
DROP TABLE IF EXISTS `lager`;
DROP TABLE IF EXISTS `hylla`;
DROP TABLE IF EXISTS `kategori`;
DROP TABLE IF EXISTS `faktura`;
DROP TABLE IF EXISTS `plocklista`;
DROP TABLE IF EXISTS `produktregister`;
DROP TABLE IF EXISTS `produkt`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `kundregister`;
DROP TABLE IF EXISTS `kund`;

CREATE TABLE `kund` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fornamn` VARCHAR(20),
    `efternamn` VARCHAR(20),
    `adress` VARCHAR(30),
    `postnummer` VARCHAR(10),
    `ort` VARCHAR(30),
    `land` VARCHAR(30),
    `telefon` VARCHAR(30),

    PRIMARY KEY (`id`)
);

-- SHOW COLUMNS FROM `kund`;

CREATE TABLE `kundregister` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `kund_id` INT NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`kund_id`) REFERENCES `kund` (`id`)
);

-- SHOW COLUMNS FROM `kundregister`;

CREATE TABLE `order` (
    `ordernummer` INT NOT NULL AUTO_INCREMENT,
    `status` CHAR(20) DEFAULT 'inte verifierad',
    `order_datum` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `order_updaterad` TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    `order_raderad` TIMESTAMP DEFAULT NULL,
    `order_bestalld` TIMESTAMP DEFAULT NULL,
    `order_skickad` TIMESTAMP DEFAULT NULL,
    `kund_id` INT,

    PRIMARY KEY (`ordernummer`),
    FOREIGN KEY (`kund_id`) REFERENCES `kund` (`id`)
);

-- SHOW COLUMNS FROM `order`;

CREATE TABLE `produkt` (
    `produkt_kod` VARCHAR(40) NOT NULL,
    `pris` DECIMAL(10,2),
    `namn` VARCHAR(80) NOT NULL,
    `bildlank` VARCHAR(100),
    `beskrivning` VARCHAR(100),

    PRIMARY KEY (`produkt_kod`)
);

-- SHOW COLUMNS FROM `produkt`;

CREATE TABLE `produktregister` (
    `id` VARCHAR(40) NOT NULL,
    `namn` VARCHAR(80) NOT NULL,
    `antal` INT DEFAULT 0,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`) REFERENCES `produkt` (`produkt_kod`)
);

-- SHOW COLUMNS FROM `produktregister`;

CREATE TABLE `plocklista` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `ordernummer` INT NOT NULL,
    `order_datum` datetime NOT NULL,
    `produkt` varchar(80) NOT NULL,
    `antal` INT NOT NULL DEFAULT 0,
    `hylla` char(10) NOT NULL,
    `kund_id` INT NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`ordernummer`) REFERENCES `order` (`ordernummer`),
    FOREIGN KEY (`kund_id`) REFERENCES `kund` (`id`)
);

-- SHOW COLUMNS FROM `plocklista`;

CREATE TABLE `faktura` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `ordernummer` INT NOT NULL,
    `order_datum` datetime NOT NULL,
    `status` VARCHAR(15) DEFAULT 'inte betald',
    `betald` VARCHAR(10) DEFAULT '----------',
    `produkt` varchar(80) NOT NULL,
    `antal` INT NOT NULL DEFAULT 0,
    `pris` INT NOT NULL,
    `kund_id` INT NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`ordernummer`) REFERENCES `order` (`ordernummer`),
    FOREIGN KEY (`kund_id`) REFERENCES `kund` (`id`)
);

-- SHOW COLUMNS FROM `faktura`;

CREATE TABLE `kategori` (
    `namn` varchar(80) NOT NULL,

    PRIMARY KEY (`namn`)
);

-- SHOW COLUMNS FROM `kategori`;

CREATE TABLE `hylla` (
    `namn` char(10) NOT NULL,
    `antal` INT DEFAULT 0,

    PRIMARY KEY (`namn`)
);

-- SHOW COLUMNS FROM `hylla`;

CREATE TABLE `lager` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `hylla` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY (`hylla`),
    FOREIGN KEY (`hylla`) REFERENCES `hylla` (`namn`)
);

-- SHOW COLUMNS FROM `lager`;

CREATE TABLE `order_rader` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL,
    `produkt_id` VARCHAR(40) NOT NULL,
    `antal` INT DEFAULT 0,
    `pris` DECIMAL(10,2),

    PRIMARY KEY (`id`),
    UNIQUE KEY (`order_id`, `produkt_id`),
    FOREIGN KEY (`order_id`) REFERENCES `order` (`ordernummer`),
    FOREIGN KEY (`produkt_id`) REFERENCES `produkt` (`produkt_kod`)
);

-- SHOW COLUMNS FROM `order_rader`;

CREATE TABLE `kategori_rader` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `produkt_id` VARCHAR(40) NOT NULL,
    `kategori_namn` VARCHAR(80),

    PRIMARY KEY (`id`),
    FOREIGN KEY (`produkt_id`) REFERENCES `produkt` (`produkt_kod`),
    FOREIGN KEY (`kategori_namn`) REFERENCES `kategori` (`namn`)
);

-- SHOW COLUMNS FROM `kategori_rader`;

CREATE TABLE `hylla_rader` (
    `produkt_id` VARCHAR(40) NOT NULL,
    `antal` INT DEFAULT 0 CHECK (`antal` >= 0),
    `hylla_namn` VARCHAR(80),
    `hylla_updaterad` TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`produkt_id`, `hylla_namn`),
    FOREIGN KEY (`produkt_id`) REFERENCES `produkt` (`produkt_kod`),
    FOREIGN KEY (`hylla_namn`) REFERENCES `hylla` (`namn`)
);

-- SHOW COLUMNS FROM `hylla_rader`;

CREATE TABLE `log`
(
    `id` INT AUTO_INCREMENT,
    `tidstampel` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `handelse` VARCHAR(100),

    PRIMARY KEY (`id`)
);

-- SHOW COLUMNS FROM `log`;

---------------------------------------
-- Loggs events fro produkt
---------------------------------------
CREATE TRIGGER log_product_insert
AFTER INSERT
ON `produkt` FOR EACH ROW
    INSERT INTO `log` (`tidstampel`, `handelse`)
        VALUES (NOW(), CONCAT("'Ny produkt lades till med produktid ", NEW.produkt_kod, ".'"));

CREATE TRIGGER log_product_update
AFTER UPDATE
ON `produkt` FOR EACH ROW
    INSERT INTO `log` (`tidstampel`, `handelse`)
        VALUES (NOW(), CONCAT("'Detaljer om produktid ", NEW.produkt_kod, " uppdaterades.'"));

CREATE TRIGGER log_product_delete
AFTER DELETE
ON `produkt` FOR EACH ROW
    INSERT INTO `log` (`tidstampel`, `handelse`)
        VALUES (NOW(), CONCAT("'Produkten med produktid ", OLD.produkt_kod, "raderades.'"));

-- SHOW TABLES;

---------------------------------------
-- Generates a invioce
---------------------------------------
DELIMITER ;;
CREATE TRIGGER generate_invoice 
AFTER UPDATE ON `order`
FOR EACH ROW
BEGIN
    IF NEW.`order_skickad` IS NOT NULL THEN
        INSERT INTO `faktura` (`ordernummer`, `order_datum`, `produkt`, `antal`, `pris`, `kund_id`)
        SELECT 
            OLD.ordernummer,
            OLD.order_datum,
            o_r.produkt_id,
            o_r.antal,
            o_r.pris,
            OLD.kund_id
        FROM `order_rader` AS o_r
            JOIN `hylla_rader` AS h_r 
                ON o_r.produkt_id = h_r.produkt_id
        WHERE
            o_r.order_id = OLD.ordernummer AND
            h_r.hylla_updaterad >= NEW.`order_skickad`;
    END IF;
END
;;
DELIMITER ;

-- SHOW TABLES;

---------------------------------------
-- Shows all categories
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_category()
BEGIN
    SELECT * FROM kategori;
END
;;
DELIMITER ;

---------------------------------------
-- Shows all shelves
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_shelves()
BEGIN
    SELECT `hylla` FROM `lager`;
END
;;
DELIMITER ;

---------------------------------------
-- Shows all products with amount and category
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_products()
BEGIN
    SELECT 
        produkt_kod,
        namn,
        pris,
        hy.antal AS antal,
        GROUP_CONCAT(DISTINCT CONCAT(" ", kr.kategori_namn)) AS kategori
    FROM produkt AS p
        LEFT OUTER JOIN hylla_rader AS hy
            ON p.produkt_kod = hy.produkt_id
        LEFT OUTER JOIN kategori_rader AS kr
            ON p.produkt_kod = kr.produkt_id
    GROUP BY
        p.produkt_kod
;
END
;;
DELIMITER ;

---------------------------------------
-- Shows all products with amount and category
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_products_amount()
BEGIN
    SELECT 
        SUM(antal) AS antal
    FROM `hylla_rader` 
    GROUP BY 
        produkt_id;
END
;;
DELIMITER ;

---------------------------------------
-- Shows all products with amount and category
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_order_products()
BEGIN
    SELECT 
        namn,
        produkt_kod,
        pris,
        bildlank,
        beskrivning,
        hy.antal,
        GROUP_CONCAT(CONCAT(" ", kr.kategori_namn)) AS kategori
    FROM produkt AS p
        LEFT OUTER JOIN hylla_rader AS hy
            ON p.produkt_kod = hy.produkt_id
        LEFT OUTER JOIN kategori_rader AS kr
            ON p.produkt_kod = kr.produkt_id
    GROUP BY
        p.produkt_kod
;
END
;;
DELIMITER ;

---------------------------------------
-- Shows all products
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_products_limited()
BEGIN
    SELECT 
        produkt_kod AS id,
        namn
    FROM produkt
;
END
;;
DELIMITER ;

---------------------------------------
-- Shows all customers
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_customer()
BEGIN
    SELECT 
        CONCAT(fornamn," ",efternamn) AS namn,
        adress,
        postnummer,
        ort,
        telefon,
        id
    FROM kund
;
END
;;
DELIMITER ;

---------------------------------------
-- Shows order
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_order(
    o_id INT
)
BEGIN
    SELECT 
        *
    FROM `order_rader`
    WHERE 
        order_id = o_id
;
END
;;
DELIMITER ;

---------------------------------------
-- Shows log
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_log(
    a_limit INT
)
BEGIN
    SELECT 
        DATE_FORMAT(`tidstampel`, "%H:%i:%s | %y-%m-%d") AS `tidstämpel`,
        `handelse` AS `händelse`
    FROM `log`
    ORDER BY `id` DESC
    LIMIT a_limit
;
END
;;
DELIMITER ;

---------------------------------------
-- Shows specified invoice
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_invoice(
    o_id INT
)
BEGIN
    SELECT 
        f.`ordernummer`,
        DATE_FORMAT(f.`order_datum`, "%H:%i:%s | %y-%m-%d") AS `order_datum`,
        f.`status`,
        p.namn AS produkt,
        f.`antal`,
        f.`pris`,
        f.`kund_id`,
        f.`betald`
    FROM `faktura`AS f
        JOIN `produkt` AS p
            ON p.produkt_kod = f.produkt
    WHERE 
        ordernummer = o_id
;
END
;;
DELIMITER ;

---------------------------------------
-- Shows inventory
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_inventory()
BEGIN
    SELECT 
        produkt_kod AS id,
        namn,
        hy.hylla_namn AS hylla,
        hy.antal
    FROM produkt AS p
        LEFT OUTER JOIN hylla_rader AS hy
            ON p.produkt_kod = hy.produkt_id
        LEFT OUTER JOIN kategori_rader AS kr
            ON p.produkt_kod = kr.produkt_id
    GROUP BY
        produkt_kod,
        hy.hylla_namn
;
END
;;
DELIMITER ;

---------------------------------------
-- Searches inventory
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE search_inventory(
    a_str VARCHAR(30)
)
BEGIN
    SELECT 
        produkt_kod AS id,
        namn,
        hy.hylla_namn AS hylla,
        hy.antal
    FROM produkt AS p
        LEFT OUTER JOIN hylla_rader AS hy
            ON p.produkt_kod = hy.produkt_id
        LEFT OUTER JOIN kategori_rader AS kr
            ON p.produkt_kod = kr.produkt_id
    WHERE
        produkt_kod LIKE a_str
        OR namn LIKE a_str
        OR hy.hylla_namn LIKE a_str
    GROUP BY
        produkt_kod
;
END
;;
DELIMITER ;

---------------------------------------
-- Adds a new product
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE add_product(
    a_id VARCHAR(40),
    a_price DECIMAL(10,2),
    a_name VARCHAR(80),
    a_picture VARCHAR(100),
    a_description VARCHAR(100)
)
BEGIN
    INSERT INTO 
        `produkt` 
    VALUES 
        (a_id, a_price, a_name, a_picture, a_description);
END
;;
DELIMITER ;


---------------------------------------
-- Adds a category to a product
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE add_product_categories(
    a_id VARCHAR(40),
    a_category VARCHAR(80)
)
BEGIN
    INSERT INTO `kategori_rader`
        (`produkt_id`, `kategori_namn`)
    VALUES 
        (a_id, a_category);
END
;;
DELIMITER ;

---------------------------------------
-- Adds a new order
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE create_order(
    a_id INT
)
BEGIN
    INSERT INTO `order`
        (`kund_id`)
    VALUES 
        (a_id);
END
;;
DELIMITER ;

---------------------------------------
-- Adds a new order_row
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE create_order_row(
    o_id INT,
    p_id VARCHAR(40),
    amount INT,
    price DECIMAL(10,2)
)
BEGIN
    INSERT IGNORE INTO `order_rader`
        (`order_id`,`produkt_id`,`antal`,`pris`)
    VALUES 
        (o_id, p_id, amount, price);
END
;;
DELIMITER ;

---------------------------------------
-- Adds a new shelf_row
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE create_shelf_row(
    a_id VARCHAR(40),
    a_shelf VARCHAR(80),
    a_amount INT
)
BEGIN
    INSERT IGNORE INTO `hylla_rader`
        (`produkt_id`,`antal`,`hylla_namn`)
    VALUES 
        (a_id, a_amount, a_shelf);
END
;;
DELIMITER ;

---------------------------------------
-- Show all info about the product
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_info_product(
    a_id VARCHAR(40)
)
BEGIN
    SELECT * FROM `produkt` WHERE produkt_kod = a_id;
END
;;
DELIMITER ;

---------------------------------------
-- Show product on shelf
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_info_shelf(
    a_id VARCHAR(40),
    a_shelf VARCHAR(80)
)
BEGIN
    SELECT
        `produkt_id`,
        `antal`,
        `hylla_namn`,
        p.namn AS namn
    FROM `hylla_rader` as hr
        LEFT OUTER JOIN `produkt` as p
            ON hr.produkt_id = p.produkt_kod
    WHERE 
        produkt_kod = a_id
        and hylla_namn = a_shelf;
END
;;
DELIMITER ;

---------------------------------------
-- Show all orders
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_orders()
BEGIN
    SELECT 
        o.`ordernummer`,
        DATE_FORMAT(o.`order_datum`, "%y-%m-%d | %H:%i:%s") AS `order_datum`,
        order_status(o.`order_datum`, o.`order_updaterad`, o.`order_raderad`, o.`order_bestalld`, o.`order_skickad`) AS `status`,
        COUNT(rader.`order_id`) AS rader,
        o.`kund_id`,
        CONCAT(k.fornamn," ",k.efternamn) AS namn
    FROM `order` AS o
        LEFT OUTER JOIN `order_rader` AS rader
            ON o.`ordernummer` = rader.`order_id`
        JOIN `kund` as k
                ON o.`kund_id` = k.`id`
    GROUP BY o.`ordernummer`
    ;
END
;;
DELIMITER ;

---------------------------------------
-- Show all specified order
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE show_order_overview(
    o_id INT
)
BEGIN
    SELECT 
        o.`ordernummer`,
        DATE_FORMAT(o.`order_datum`, "%y-%m-%d | %H:%i:%s") AS `order_datum`,
        order_status(o.`order_datum`, o.`order_updaterad`, o.`order_raderad`, o.`order_bestalld`, o.`order_skickad`) AS `status`,
        COUNT(rader.`order_id`) AS rader,
        o.`kund_id`,
        CONCAT(k.fornamn," ",k.efternamn) AS namn,
        k.adress AS adress,
        k.postnummer AS postnummer,
        k.ort AS ort,
        k.telefon AS telefon
    FROM `order` AS o
        LEFT OUTER JOIN `order_rader` AS rader
            ON o.`ordernummer` = rader.`order_id`
        JOIN `kund` as k
                ON o.`kund_id` = k.`id`
    WHERE order_id = o_id
    GROUP BY o.`ordernummer`
    ;
END
;;
DELIMITER ;

---------------------------------------
-- Show all orders
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE search_orders(
    a_id INT
)
BEGIN
    SELECT 
        o.`ordernummer`,
        DATE_FORMAT(o.`order_datum`, "%y-%m-%d | %H:%i:%s") AS `order_datum`,
        order_status(o.`order_datum`, o.`order_updaterad`, o.`order_raderad`, o.`order_bestalld`, o.`order_skickad`) AS `status`,
        COUNT(rader.`order_id`) AS rader,
        o.`kund_id`,
        CONCAT(k.fornamn," ",k.efternamn) AS namn
    FROM `order` AS o
        LEFT OUTER JOIN `order_rader` AS rader
            ON o.`ordernummer` = rader.`order_id`
        JOIN `kund` as k
                ON o.`kund_id` = k.`id`
    WHERE
        o.`ordernummer` = a_id
        OR o.`kund_id` = a_id
    GROUP BY o.`ordernummer`
    ;
END
;;
DELIMITER ;

---------------------------------------
-- pick list
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE picklist(
    a_id INT
)
BEGIN
    SELECT 
        o.`ordernummer`,
        DATE_FORMAT(o.`order_datum`, "%y-%m-%d | %H:%i:%s") AS `order_datum`,
        p.namn AS produkt,
        p.produkt_kod AS id,
        r.`antal` AS antal,
        hy.hylla_namn AS hylla,
        in_lager(hy.antal) AS `lager_status`
    FROM `order` AS o
        LEFT OUTER JOIN `order_rader` AS r
            ON o.`ordernummer` = r.`order_id`
        LEFT OUTER JOIN hylla_rader AS hy
            ON r.`produkt_id` = hy.produkt_id
        LEFT OUTER JOIN produkt AS p
            ON r.`produkt_id` = p.produkt_kod
    WHERE 
        o.`ordernummer` = a_id
    ;
END
;;
DELIMITER ;


---------------------------------------
-- Update product
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE update_product(
    a_id VARCHAR(40),
    a_price DECIMAL(10,2),
    a_name VARCHAR(80),
    a_picture VARCHAR(100),
    a_description VARCHAR(100)
)
BEGIN
    UPDATE `produkt` SET
        `pris` = a_price,
        `namn` = a_name,
        `bildlank` = a_picture,
        `beskrivning` = a_description
    WHERE
        `produkt_kod` = a_id;
END
;;
DELIMITER ;

---------------------------------------
-- Update product
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE update_shelf(
    a_id VARCHAR(40),
    a_shelf VARCHAR(80),
    a_amount INT
)
BEGIN
    UPDATE `hylla_rader` SET
        `antal` = a_amount
    WHERE
        `produkt_id` = a_id
        AND `hylla_namn` = a_shelf;
END
;;
DELIMITER ;

---------------------------------------
-- Update invoice
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE pay_invoice(
    a_id INT,
    a_date VARCHAR(10)
)
BEGIN
    UPDATE `faktura` SET
        `betald` = a_date,
        `status` = 'betald'
    WHERE
        `ordernummer` = a_id;
END
;;
DELIMITER ;

---------------------------------------
-- Insert product amount
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE insert_amount(
    a_id VARCHAR(40),
    a_shelf VARCHAR(80),
    a_amount VARCHAR(10)
)
BEGIN
    START TRANSACTION;
        INSERT INTO `produkt`
            (`produkt_kod`, `namn`)
        VALUES
            (a_id, a_id)
        ON DUPLICATE KEY UPDATE
            `produkt_kod` = a_id;
        
        INSERT INTO `hylla_rader`
            (`produkt_id`, `antal`, `hylla_namn`)
        VALUES
            (a_id, a_amount, a_shelf) 
        ON DUPLICATE KEY UPDATE
            `antal` =  `antal` + a_amount;
    COMMIT;
END
;;
DELIMITER ;

---------------------------------------
-- Update product amount
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE update_amount(
    a_id VARCHAR(40),
    a_shelf VARCHAR(80),
    a_amount VARCHAR(10)
)
BEGIN
    UPDATE `hylla_rader` SET
        `antal` =  `antal` - a_amount
    WHERE
        `produkt_id` = a_id
        AND `hylla_namn` = a_shelf;
END
;;
DELIMITER ;

---------------------------------------
-- Update order status
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE update_order_status_orderd(
    o_id INT
)
BEGIN
    UPDATE `order` SET
        `order_bestalld` =  CURRENT_TIMESTAMP
    WHERE
        `ordernummer` = o_id;
END
;;
DELIMITER ;

---------------------------------------
-- Update order status (shipped)
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE update_order_status_shipped(
    o_id INT
)
BEGIN
    UPDATE `order` SET
        `order_skickad` =  CURRENT_TIMESTAMP
    WHERE
        `ordernummer` = o_id;
END
;;
DELIMITER ;

---------------------------------------
-- Delete product
---------------------------------------
DELIMITER ;;
CREATE PROCEDURE delete_product(
    a_id VARCHAR(40)
)
BEGIN
    START TRANSACTION;
        DELETE FROM `hylla_rader`
        WHERE
            `produkt_id` = a_id;
        
        DELETE FROM `kategori_rader`
        WHERE
            `produkt_id` = a_id;

        DELETE FROM `produkt`
        WHERE
            `produkt_kod` = a_id;
    COMMIT;
END
;;
DELIMITER ;


---------------------------------------
-- Returns orders status
---------------------------------------
DELIMITER ;;

CREATE FUNCTION order_status(
    o_skapad TIMESTAMP,
    o_updaterad TIMESTAMP,
    o_raderad TIMESTAMP,
    o_bestalld TIMESTAMP,
    o_skickad TIMESTAMP
)
RETURNS VARCHAR(10)
DETERMINISTIC
BEGIN
    IF o_skickad IS NOT NULL THEN
        RETURN 'skickad';
    ELSEIF o_bestalld IS NOT NULL THEN
        RETURN 'beställd';
    ELSEIF o_raderad IS NOT NULL THEN
        RETURN 'raderad';
    ELSEIF o_updaterad IS NOT NULL THEN
        RETURN 'uppdaterad';
    ELSEIF o_skapad IS NOT NULL THEN
        RETURN 'skapad';
    END IF;
END
;;


---------------------------------------
-- Returns if item in lager
---------------------------------------
DELIMITER ;;

CREATE FUNCTION in_lager(
    amount INT
)
RETURNS VARCHAR(10)
DETERMINISTIC
BEGIN
    IF amount = 0 THEN
        RETURN 'Slut';
    END IF;
    RETURN 'Finns';
END
;;

DELIMITER ;
