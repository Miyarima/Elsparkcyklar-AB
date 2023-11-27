
DROP PROCEDURE IF EXISTS create_invoice;
DELIMITER ;;

CREATE PROCEDURE create_invoice(
    IN travel_id_in INT,
    IN issue_date_in TEXT,
    IN expiry_date_in TEXT
)
BEGIN
    INSERT INTO Invoice(travel_id,issue_date,`expiry_date`)
    VALUES(travel_id_in, issue_date_in, expiry_date_in);
    END ;;

DELIMITER ;


DROP PROCEDURE IF EXISTS update_invoice_status;
DELIMITER ;;

CREATE PROCEDURE update_invoice_status(
    IN paid_in BOOLEAN,
    IN invoice_id_in INT
)
BEGIN
    UPDATE Invoice
    SET paid = paid_in
    WHERE id = invoice_id_in;
    END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS get_invoices_for_user;
DELIMITER ;;
CREATE PROCEDURE get_invoices_for_user(
    IN username_in VARCHAR(100)
)
    BEGIN
    SELECT i.* FROM Invoice i
    LEFT JOIN Travel t ON i.travel_id = t.id
    WHERE t.`username` = username_in;
    END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS get_all_invoices;
DELIMITER ;;

CREATE PROCEDURE get_all_invoices()
    BEGIN 
    SELECT * FROM Invoice;
    END ;;

DELIMITER ;