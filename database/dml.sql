
INSERT INTO User (longitude, latitude, wallet, username, `password`, `role`, email)
VALUES (12.345, 34.567, 100.00, 'alice_jones', 'pass456', 'user', 'alice.jones@email.com'),
(-45.678, 78.901, 50.50, 'charlie_smith', 'p@ssw0rd', 'admin', 'charlie.smith@email.com'),
(0.0, 0.0, 75.25, 'david_miller', 'securepass123', 'user', 'david.miller@email.com');

INSERT INTO City (longitude, latitude, `name`) VALUES (18.0686, 59.3293, 'Stockholm'),
(13.0007, 55.6050, 'Malmö');

INSERT INTO Zone (city_id, longitude, latitude)
VALUES
    (1, 18.0686, 59.3293),
    (2, 13.0007, 55.6050);

INSERT INTO Station (city_id, longitude, latitude, `address`)
VALUES
    (1, 18.0686, 59.3293, 'Address 1, Stockholm'),
    (2, 13.0007, 55.6050, 'Address 2, Malmö');

INSERT INTO Bike (longitude, latitude, `status`)
VALUES
    (18.0686, 59.3293, 'Available'),
    (13.0007, 55.6050, 'In Use');

