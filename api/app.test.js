const request = require("supertest");
const app = require("./app.js");

describe("GET /api", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).get("/api").send({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key", () => {
        test("should respond with a 200 status code and routes", async () => {
            const res = await request(app).get("/api").query({
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

describe("GET /api/bike/:id/:userid/rent", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).put("/api/bike/:id/:userid/rent").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, but nothing else", () => {
        test("should respond with a 400 status code", async () => {
            const res = await request(app).put("/api/bike/:id/:userid/rent").query({
                apiKey: 1,
            });
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({
                error: "Content-Type must be application/json",
            });
        });
    });
    describe("Providing an API Key with content-type, but no bikeid", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app)
                .put("/api/bike/:id/:userid/rent")
                .query({
                    apiKey: 1,
                })
                .set("content-type", "application/json")
                .send({
                    userid: "mos"
                });
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({
                error: "No user to rent the bike was provided",
            });
        });
    });
    describe("Providing an API Key with content-type, but no userid", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app)
                .put("/api/bike/:id/:userid/rent")
                .query({
                    apiKey: 1,
                })
                .set("content-type", "application/json")
                .send({
                    id: 1,
                });
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({
                error: "No user to rent the bike was provided",
            });
        });
    });
    describe("Providing an API Key with content-type and bike ID", () => {
        test("should respond with a 200 status code", async () => {
            const res = await request(app)
                .put("/api/bike/:id/:userid/rent")
                .query({
                    apiKey: 1,
                })
                .set("content-type", "application/json")
                .send({
                    id: 1,
                    userid: "mos"
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                message: "bike has been rented",
            });
        });
    });
});
