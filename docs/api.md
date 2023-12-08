# API

Introducing our innovative Bike Renting System API, designed to revolutionize the way you manage bike rentals. Our API offers seamless integration, allowing businesses to effortlessly incorporate bike rental functionalities into their platforms. With robust features for inventory management, user authentication, rental tracking, and payment processing, our API ensures a smooth and efficient renting experience. Experience the power of effortless bike rentals with our flexible and scalable API, empowering businesses to cater to the growing demand for sustainable and convenient transportation solutions.

## Usage

To use the public API you will need to generate a API key on the following link<br>

```bash
/api/apikey
```

It will return a key, which you need to use in every request to use the API

## Exampel

A Request should look like this

```js
const result = await fetch(
    `https://api:8080/api/bike/:id/rent?apiKey=${apiKey}`,
    {
        body: {
            user: "mos", // <-- kanske behövs något mer här
        },
        headers: {
            "content-type": "application/json",
        },
        method: "PUT",
    },
);
```

The response could look like this

```js
{
    "message": "bike has been rented"
}

```

## All Available Routes

## Cities

**GET**

```bash
/api/cities
```

returns all cities

---

**POST**

```bash
/api/city
```

body

```bash
name
longitude
latitude
```

adds new city

---

**GET**

```bash
/api/city/:id
```

returns specific city

---

**GET**

```bash
/api/city/:city/bike
```

returns all bikes within a specific city

---

**GET**

```bash
/api/city/:id/zone
```

returns zones, bikes and charging statioins in specific city

---

**POST**

```bash
/api/city/:id/bike/:nr
```

add a number of bikes to specific city

---

**PUT**

```bash
/api/city/:id/bike/:nr
```

update a number of bikes from specific city

---

**DELETE**

```bash
/api/city/:id/bike/:nr
```

Remove a number of bikes from specific city

---

**PUT**

```bash
/api/city/:id/zone/:id/ports
```

returns all avaible ports on a station

---

## Users

**GET**

```bash
/api/users
```

returns all users in the system

---

**POST**

```bash
/api/user
```

body

```bash
username
password
email
longitude (opt)
latitude (opt)
wallet (opt)
role (opt)
api_key (opt)
```

adds a user to the system

---

**GET**

```bash
/api/user/:id
```

returns specific user in the system

---

**PUT**

```bash
/api/user
```

body

```bash
username
password (opt)
email (opt)
longitude (opt)
latitude (opt)
wallet (opt)
role (opt)
api_key (opt)
```

update a specific user in the system

---

**PUT**

```bash
/api/user/:id/travel
```

returns the travel history for the specific user

---

## Bikes

**GET**

```bash
/api/bikes
```

returns all bikes in the system

---

**PUT**

```bash
/api/bike/:id/:userid/rent
```

rents the bike with the given ID, userid is also required in order to bind the bike to the specific user
send user in headers

---

**PUT**

```bash
/api/bike/:id/:longitude/:latitude/returned
```

returns the bike with the given ID
also takes longitude and latitude for the bikeID in question, is required in order to updated the bike length

---

**GET**

```bash
/api/bike/:id/position
```

retrive the position of the bike with the given ID

---

**PUT**

```bash
/api/bike/:id/position
```

body

```bash
id
longitude
latitude
```

update the location of a bike with the given ID

---

**GET**

```bash
/bike/:id
```

returns all information about the bike with the given ID

---

**PUT**

```bash
/bike/:id
```

turns of the bike with the given ID

---

**DELETE**

```bash
/bike/:id
```

delets the bike with the given ID
