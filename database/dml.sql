
INSERT INTO User (longitude, latitude, wallet, id, `password`, `role`, email)
VALUES (12.345, 34.567, 100.00, 'alice_jones', 'pass456', 'User', 'alice.jones@email.com'),
(-45.678, 78.901, 50.50, 'charlie_smith', 'p@ssw0rd', 'Admin', 'charlie.smith@email.com'),
(0.0, 0.0, 75.25, 'david_miller', 'securepass123', 'User', 'david.miller@email.com');

INSERT INTO City (longitude, latitude, `name`) VALUES 
(18.0686, 59.3293, 'Stockholm'),
(15.5855732, 56.1612923, 'Karlskrona'),
(12.8280038, 55.8700565, 'Landskrona')
;

INSERT INTO Zone (city_id, longitude, latitude,max_speed)
VALUES
    (1, 18.0686, 59.3293, 20),
    (3, 12.0007, 55.6050, 20);

INSERT INTO Station (longitude, latitude, `address`)
VALUES
    (18.0686, 59.3293, 'Address 1, Stockholm'),
    (18.0686, 59.3293, 'Address 2, Stockholm'),
    (12.0107, 55.6150, 'Address 1, Landskrona'),
    (12.0007, 55.6050, 'Address 2, Landskrona'),
    (15.0007, 56.6050, 'Address 1, Karlskrona'),
    (15.3007, 56.9050, 'Address 2, Karlskrona')
;

INSERT INTO Bike (longitude, latitude, `status`)
VALUES
    (18.0686, 59.3293, 'Available'),
    (18.0786, 59.3333, 'Available'),
    (18.0986, 59.4000, 'In-use'),
    (12.0007, 55.6050, 'Available'),
    (18.0686, 59.3293, 'Available'),
    (12.0007, 55.6050, 'Available')
;

INSERT INTO Bike (longitude, latitude, `status`, speed, station_id, battery)
VALUES
    (18.0686, 59.3293, 'Available', 0, 1, 100),
    (18.0786, 59.3333, 'Available', 0, 1, 95),
    (18.0986, 59.4000, 'In-use', 15, 2, 80),
    (18.0986, 59.4000, 'In-use', 15, 2, 80),
    (12.0986, 55.4000, 'In-use', 15, 4, 80),
    (12.0986, 55.4000, 'In-use', 15, 4, 80),
    (15.0007, 56.6050, 'Available', 0, 5, 100)
;

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
