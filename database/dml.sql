
INSERT INTO User (longitude, latitude, wallet, id, `password`, `role`, email)
VALUES (12.345, 34.567, 100.00, 'alice_jones', 'pass456', 'User', 'alice.jones@email.com'),
(-45.678, 78.901, 50.50, 'charlie_smith', 'p@ssw0rd', 'Admin', 'charlie.smith@email.com'),
(0.0, 0.0, 75.25, 'david_miller', 'securepass123', 'User', 'david.miller@email.com');


INSERT INTO City (longitude, latitude, `name`) VALUES 
(18.0686, 59.3293, 'Stockholm'),
(15.5855732, 56.1612923, 'Karlskrona'),
(12.8280038, 55.8700565, 'Landskrona')
;


INSERT INTO Zone (city_id, longitude, latitude, radius, max_speed)
VALUES
    (1, 15.58678, 56.16104, 250, 5),
    (1, 15.597985, 56.160089, 200, 10),
    (1, 15.584886, 56.165793, 300, 15),
    (2, 12.833764, 55.869697, 200, 5),
    (2, 12.839012, 55.873542, 300, 10),
    (2, 12.850181, 55.87154, 200, 15),
    (3, 18.058638, 59.347592, 300, 5),
    (3, 18.05265, 59.342445, 200, 10),
    (3, 18.067325, 59.348911, 300, 15);


INSERT INTO Station (longitude, latitude, `address`, `type`)
VALUES
    (15.567324, 56.165442, 'Karlskrona1', 'charging'),
    (15.594108, 56.15879, 'Hans Wachtmeister, Karlskrona', 'charging'),
    (15.598145, 56.158974, 'Stumholmen, Karlskrona', 'parking'),
    (15.584546, 56.169233, 'Lidl, Karlskrona', 'charging'),
    (15.592292, 56.166385, 'Hamnen, Karlskrona', 'charging'),
    (15.573748, 56.161779, 'Björkholmen, Karlskrona', 'charging'),
    (15.587597, 56.170252, 'Pantarholmen, Karlskrona', 'parking'),
    (12.854642, 55.87217, 'McDonalds, Landskrona', 'charging'),
    (12.829674, 55.870754, 'Landskrona museum', 'charging'),
    (12.839142, 55.871037, 'Hotel Chaplin, Landskrona', 'charging'),
    (12.834833, 55.871546, 'Landskrona stadsbibliotek', 'parking'),
    (12.83287, 55.870471, 'Glasögonmagasinet, Landskrona', 'charging'),
    (12.842077, 55.86991, 'Nordic Wellness, Landskrona', 'charging'),
    (12.830863, 55.870615, 'Rådhustorget, Landskrona', 'parking'),
    (18.054143, 59.343579, 'Stockholm stadsbibliotek', 'charging'),
    (18.04874, 59.342458, 'Odenplan, Stockholm', 'parking'),
    (18.048738, 59.345221, 'Brygghuset, Stockholm', 'charging'),
    (18.057193, 59.349225, 'Roslagsgatan, Stockholm', 'charging'),
    (18.061216, 59.343212, 'Churchill Arms Stockholm', 'charging'),
    (18.070041, 59.349638, 'KTH, Stockholm', 'charging'),
    (18.064963, 59.34819, 'Elite Hotel Arcardia, Stockholm', 'parking');

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
