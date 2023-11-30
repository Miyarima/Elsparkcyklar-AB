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

```

get "/api"

## Cities

## Users

## Bikes

// Returns all bikes
get "/api/bikes"

// Rents a bike
put "/api/bike/:id/rent"

// Returnes rented bike
put "/api/bike/:id/returned"

// Retuns position of given bike
get"/api/bike/:id/position"

// Set bike position first time
post "/api/bike/:id/position"

// Update a bike which already got a position
put "/api/bike/:id/position"

// Get all information about a specific bike
get "/bike/:id"

// Turn of specific bike
put "/api/bike/:id"

// Delete specific bike
<button style="color: white; background-color: red; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 4px;">Delete</button> "/api/bike/:id"
