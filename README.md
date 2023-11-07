# Elsparkcyklar-AB

<div align="center">

[![Linter](https://github.com/Miyarima/Elsparkcyklar-AB/actions/workflows/super-linter.yml/badge.svg)](https://github.com/Miyarima/Elsparkcyklar-AB/actions/workflows/super-linter.yml)

</div>
The company "Svenska Elsparkcyklar AB" needs a system that manages the rental of electricscooters in Swedish cities. The company operates in 3 different cities and plans to expand to more cities with the support of a new data system.
<br><br>
The system comprises the following parts, a Web-based solution for managing bikes, stations zones etc. 
A REST API which makes it possible for 3rd-party developers to create custom applications. 
A web interface for the customer were they can view travel history and add payment options. 
A mobile-adpated web app for the customer to rent and return bikes.
And lastly bike intelligence which monitors and controlls the bike.

### Table of Contents

- [Install](#installation)
- [Docker](#docker)
- [Documentation](#documentation)
- [Team](#team)

## Installation

### Prerequisites

- Linux/WSL
- Node >(Version 18.16.0)
- npm >(version 9.5.1)

### Clone the Repository

```bash
git clone git@github.com:Miyarima/Elsparkcyklar-AB.git
```

### Install Dependencies

```bash
npm i
```

### Start the Server

```bash
npm run start
```

### Docker

Stand in the root folder and write the following command to start the server
```bash
docker-compose up
```
To turn it off
```bash
docker-compose down
```

## Documentation

## Team

* [__Jonathan__](https://github.com/Miyarima)
* [__Sucro__](https://github.com/susm92)
* [__Olle__](https://github.com/deadbacteria8)
* [__Alexander__](https://github.com/A-Norre)
