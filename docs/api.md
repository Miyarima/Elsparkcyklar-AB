# API

Introducing our innovative Bike Renting System API, designed to revolutionize the way you manage bike rentals. Our API offers seamless integration, allowing businesses to effortlessly incorporate bike rental functionalities into their platforms. With robust features for inventory management, user authentication, rental tracking, and payment processing, our API ensures a smooth and efficient renting experience. Experience the power of effortless bike rentals with our flexible and scalable API, empowering businesses to cater to the growing demand for sustainable and convenient transportation solutions."

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
    }
);
```

The response could look like this

```js
{
    "message": "bike has been rented"
}

```

## All Available Routes

get "/api"

## Cities

## Users

## Bikes

**GET**

```bash
/api/bikes
```

returns all bikes in the system

---

**PUT**

```bash
/api/bike/:id/rent
```

rents the bike with the given ID
send user in headers

---

**PUT**

```bash
/api/bike/:id/returned
```

returns the bike with the given ID

---

**GET**

```bash
/api/bike/:id/position
```

retrive the position of the bike with the given ID

---

**POST**

```bash
/api/bike/:id/position
```

set the first location for a bike with the given ID

---

**PUT**

```bash
/api/bike/:id/position
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

> (vi bör nog göra mer med denna än att bara stänga en cykel)

---

**DELETE**

```bash
/bike/:id
```

delets the bike with the given ID
