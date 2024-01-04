const request = require("supertest");
const app = require("./app.js");

describe("GET /api", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).get("/api/v1").send({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key", () => {
        test("should respond with a 200 status code and routes", async () => {
            const res = await request(app).get("/api/v1").query({
                apiKey: 1,
            });
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                rotues: [
                    "/city",
                    "/city/{id}",
                    "/city/{id}/bike",
                    "/city/{id}/bike/{nr}",
                    "/user",
                    "/user/{id}",
                    "/bike",
                    "/bike/{id}/rent",
                    "/bike/{id}/returned",
                    "/bike/{id}/position",
                    "/bike/{id}",
                ],
            });
        });
    });
});

describe("GET /api/v1/dummy/:id/rent", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).put("/api/v1/dummy/1/rent").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, but nothing else", () => {
        test("should respond with a 400 status code", async () => {
            const res = await request(app).put("/api/v1/dummy/1/rent").query({
                apiKey: 1,
            });
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({
                error: "Content-Type must be application/json",
            });
        });
    });
    describe("Providing an API Key with content-type", () => {
        test("should respond with a 400 status code", async () => {
            const res = await request(app)
                .put("/api/v1/dummy/1/rent")
                .query({
                    apiKey: 1,
                })
                .set("content-type", "application/json")
                .send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({
                error: "Request body is missing or empty",
            });
        });
    });
    describe("Providing an API Key with content-type, but no user", () => {
        test("should respond with a 400 status code", async () => {
            const res = await request(app)
                .put("/api/v1/dummy/1/rent")
                .query({
                    apiKey: 1,
                })
                .set("content-type", "application/json")
                .send({
                    id: 1,
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({
                error: "No user to rent the bike was provided",
            });
        });
    });
    describe("Providing an API Key with content-type and bike ID", () => {
        test("should respond with a 200 status code", async () => {
            const res = await request(app)
                .put("/api/v1/dummy/1/rent")
                .query({
                    apiKey: 1,
                })
                .set("content-type", "application/json")
                .send({
                    user: "mos",
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                message: "bike has been rented",
            });
        });
    });
});
