
INSERT INTO User (longitude, latitude, wallet, id, `password`, `role`, email)
VALUES (12.345, 34.567, 100.00, 'alice_jones', 'pass456', 'user', 'alice.jones@email.com'),
(-45.678, 78.901, 50.50, 'charlie_smith', 'p@ssw0rd', 'admin', 'charlie.smith@email.com'),
(0.0, 0.0, 75.25, 'david_miller', 'securepass123', 'user', 'david.miller@email.com');

INSERT INTO City (longitude, latitude, `name`) VALUES (18.0686, 59.3293, 'Stockholm'),
(13.0007, 55.6050, 'Malmö');

INSERT INTO Zone (city_id, longitude, latitude,max_speed)
VALUES
    (1, 18.0686, 59.3293,20),
    (2, 13.0007, 55.6050,20);

INSERT INTO Station (zone_id, longitude, latitude, `address`)
VALUES
    (1, 18.0686, 59.3293, 'Address 1, Stockholm'),
    (2, 13.0007, 55.6050, 'Address 2, Malmö');

INSERT INTO Bike (longitude, latitude, `status`)
VALUES
    (18.0686, 59.3293, 'Available'),
    (13.0007, 55.6050, 'Available');


INSERT INTO Bike (longitude, latitude, `status`)
VALUES
    (18.0686, 59.3293, 'Available'),
    (13.0007, 55.6050, 'Available');

INSERT INTO Travel (user_id, bike_id, start_longitude, start_latitude, end_longitude, end_latitude, distance, `time`, total_cost)
VALUES
	('alice_jones', 1, 15.588942319687044, 56.161494685795574, 15.589041682600461, 56.15928884391227, 0.4, 2, 100),
    ('alice_jones', 1, 15.584517869106758, 56.16428617865516, 15.598958447904023, 56.20020191696828, 2, 10, 300)
;

INSERT INTO Invoice (issue_date, `expiry_date`, travel_id)
VALUES
	(CURRENT_DATE(), CURRENT_DATE()+5, 1),
	(CURRENT_DATE(), CURRENT_DATE()+5, 2)
;

/*
INSERT INTO Travel(bike_id, user_id, `status`, start_longitude, start_latitude) VALUES (1, 'alice_jones', 'Ongoing', (SELECT longitude FROM Bike WHERE id = 1),(SELECT latitude FROM Bike WHERE id = 1))
*/
