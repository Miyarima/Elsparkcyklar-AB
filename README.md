# Elsparkcyklar-AB

<div align="center">

[![Linter](https://github.com/Miyarima/Elsparkcyklar-AB/actions/workflows/super-linter.yml/badge.svg)](https://github.com/Miyarima/Elsparkcyklar-AB/actions/workflows/super-linter.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/b671fdfa8bbaf70b4f61/maintainability)](https://codeclimate.com/github/Miyarima/Elsparkcyklar-AB/maintainability)

<a href="https://codeclimate.com/github/Miyarima/Elsparkcyklar-AB/test_coverage"><img src="https://api.codeclimate.com/v1/badges/b671fdfa8bbaf70b4f61/test_coverage" /></a>

</div>
The company "Svenska Elsparkcyklar AB" needs a system that manages the rental of electricscooters in Swedish cities. The company operates in 3 different cities and plans to expand to more cities with the support of a new data system.
<br><br>
The system comprises the following parts, a Web-based solution for managing bikes, stations zones etc. 
A REST API which makes it possible for 3rd-party developers to create custom applications. 
A web interface for the customer were they can view travel history and add payment options. 
A mobile-adpated web app for the customer to rent and return bikes.
And lastly bike intelligence which monitors and controlls the bike.

### Table of Contents

-   [Install](#installation)
-   [Docker](#docker)
-   [Database](#database)
-   [Documentation](#documentation)
-   [Team](#team)

## Installation

### Prerequisites

-   Linux/WSL
-   Node >(Version 18.16.0)
-   npm >(version 9.5.1)

### Clone the Repository

```bash
git clone git@github.com:Miyarima/Elsparkcyklar-AB.git
```

### Install Dependencies

To run the project locally you'll need to install all dependencies. Stand in the folder `/api` and `/frontend` and run the following command.

```bash
npm i
```

### Start the Server

The project contains two servers, one in `/api` and the other one in `/frontend`. To start each server run the following command in each root folder.

```bash
npm run start
```

### Docker

Stand in the root folder and write the following command to start all services, add `-d` to detatch and `--build` to make sure it always the latest build

```bash
docker-compose up -d --build
```

To turn it off

```bash
docker-compose down
```

### Database

To connect to your local docker container running my SQL, password is `vteam`

```bash
mysql -h 127.0.0.1 -P 3307 -u vteam -p
```

## Documentation

## Team

-   [**Jonathan**](https://github.com/Miyarima)
-   [**Sucro**](https://github.com/susm92)
-   [**Olle**](https://github.com/deadbacteria8)
-   [**Alexander**](https://github.com/A-Norre)
