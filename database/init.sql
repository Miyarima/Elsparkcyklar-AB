DROP DATABASE IF EXISTS Elsparkcyklar;
CREATE DATABASE Elsparkcyklar;
USE Elsparkcyklar;
source docker-entrypoint-initdb.d/ddl.sql;
source docker-entrypoint-initdb.d/dml.sql;
