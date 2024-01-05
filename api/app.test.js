const request = require("supertest");
const app = require("./app.js");
const db = require("./db/sql.js");
const dbCreate = require("./db/functionsForAllTables.js");
const bikeController = require("./controllers/bikeApiController.js");
const userController = require("./controllers/userApiController.js");

const mockReturnValue = true;
const mockLongitude = 50.1234;
const mockLatitude = 15.5678;

jest.mock("./db/functionsForBike.js", () => ({
    ...jest.requireActual("./db/functionsForBike.js"),
    gatheredBikeFunctions: {
        getAllBikes: jest.fn(),
        unlockBike: jest.fn(),
        lockBike: jest.fn(),
        getOneBike: jest.fn(),
        changePowerStatus: jest.fn(),
        deleteBike: jest.fn(),
    },
}));

jest.mock("./db/functionsForUser.js", () => ({
    ...jest.requireActual("./db/functionsForUser.js"),
    gatheredUserFunctions: {
        allUsers: jest.fn(),
        specificUser: jest.fn(),
        getUsernameFromGit: jest.fn(),
        selectRowsWithEmail: jest.fn(),
        selectTravelForUser: jest.fn(),
        getUserTravelStatus: jest.fn(),
        deleteUser: jest.fn(),
    },
}));

jest.mock("./db/functionsForAllTables.js", () => ({
    ...jest.requireActual("./db/functionsForAllTables.js"),
    functionsForAllTables: {
        oneRowUpdateTable: jest.fn(),
        insertTable: jest.fn(),
    },
}));

describe("GET /api/v1", () => {
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
                apiKey: 123,
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

describe("GET /api/v1/bikes", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).get("/api/v1/bikes").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key", () => {
        test("should respond with a 200 status code, and all bikes", async () => {
            db.gatheredBikeFunctions.getAllBikes.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await bikeController.getAllBikes(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                bikes: true,
            });
        });
    });
});

describe("GET /api/v1/:id/:userid/rent", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app)
                .put("/api/v1/bike/1/1/rent")
                .query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, but nothing else", () => {
        test("should respond with a 400 status code", async () => {
            const res = await request(app).put("/api/v1/bike/1/1/rent").query({
                apiKey: 123,
            });
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({
                error: "Content-Type must be application/json",
            });
        });
    });
    describe("Providing an API Key, with content-type and bike ID", () => {
        test("should respond with a 200 status code, and that the bike has been rented", async () => {
            db.gatheredBikeFunctions.unlockBike.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                params: { id: 1, userid: 1 },
                headers: { "content-type": "application/json" },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await bikeController.rentBike(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "bike has been rented",
                status: true,
            });
        });
    });
});

describe("GET /api/v1/bike/:id/:longitude/:latitude/return", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app)
                .put("/api/v1/bike/1/13/37/return")
                .query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, with correct params and bike ID", () => {
        test("should respond with a 200 status code, and that the bike has been returned", async () => {
            db.gatheredBikeFunctions.lockBike.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                params: { id: 1, longitude: 13, latitude: 37 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await bikeController.returnBike(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "bike has been returned",
                status: true,
            });
        });
    });
});

describe("GET /api/v1/bike/:id/position", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app)
                .get("/api/v1/bike/1/position")
                .query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, with correct params and bike ID", () => {
        test("should respond with a 200 status code, and the position of the bike", async () => {
            db.gatheredBikeFunctions.getOneBike.mockResolvedValue([
                { longitude: mockLongitude, latitude: mockLatitude },
            ]);

            const req = {
                query: { apiKey: 123 },
                params: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await bikeController.getBikePosition(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                longitude: mockLongitude,
                latitude: mockLatitude,
            });
        });
    });
});

describe("PUT /api/v1/bike/:id/position", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app)
                .put("/api/v1/bike/1/position")
                .query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, but nothing else", () => {
        test("should respond with a 400 status code", async () => {
            const res = await request(app)
                .put("/api/v1/bike/1/position")
                .query({
                    apiKey: 123,
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({
                error: "Content-Type must be application/json",
            });
        });
    });
    describe("Providing an API Key, with content-type and bike ID", () => {
        test("should respond with a 200 status code, and that the bike has been updated", async () => {
            dbCreate.functionsForAllTables.oneRowUpdateTable.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                params: {
                    id: 1,
                },
                headers: { "content-type": "application/json" },
                body: { longitude: mockLongitude, latitude: mockLatitude },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await bikeController.updateBikePosition(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "The bike has been updated",
            });
        });
    });
});

describe("PUT /api/v1/bike/:id/station", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app)
                .put("/api/v1/bike/1/station")
                .query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, but nothing else", () => {
        test("should respond with a 400 status code", async () => {
            const res = await request(app).put("/api/v1/bike/1/station").query({
                apiKey: 123,
            });
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({
                error: "Content-Type must be application/json",
            });
        });
    });
    describe("Providing an API Key, with content-type and bike ID", () => {
        test("should respond with a 200 status code, and that the bike has been updated", async () => {
            dbCreate.functionsForAllTables.oneRowUpdateTable.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                params: {
                    id: 1,
                },
                headers: { "content-type": "application/json" },
                body: {
                    id: 1,
                    longitude: mockLongitude,
                    latitude: mockLatitude,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await bikeController.updateBikeStation(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "The user has been updated",
            });
        });
    });
});

describe("GET /api/v1/bike/:id", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).get("/api/v1/bike/1").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, with correct params and bike ID", () => {
        test("should respond with a 200 status code, and the all info about the bike", async () => {
            db.gatheredBikeFunctions.getOneBike.mockResolvedValue([
                mockReturnValue,
            ]);

            const req = {
                query: { apiKey: 123 },
                params: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await bikeController.getSpecificBike(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                bike: [true],
            });
        });
    });
});

describe("PUT /api/v1/bike/:id", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).put("/api/v1/bike/1").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key bike ID", () => {
        test("should respond with a 200 status code, and that the bike has been turned off", async () => {
            db.gatheredBikeFunctions.changePowerStatus.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                params: {
                    id: 1,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await bikeController.turnOffSpecificBike(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "the bike has been turned off",
                status: true,
            });
        });
    });
});

describe("DELETE /api/v1/bike/:id", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).delete("/api/v1/bike/1").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key and bike ID", () => {
        test("should respond with a 200 status code, and that the bike has been deleted", async () => {
            db.gatheredBikeFunctions.deleteBike.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                params: {
                    id: 1,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await bikeController.deleteSpecificBike(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "the bike has been deleted",
                status: true,
            });
        });
    });
});

describe("GET /api/v1/users", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).get("/api/v1/users").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key", () => {
        test("should respond with a 200 status code, and all users", async () => {
            db.gatheredUserFunctions.allUsers.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await userController.getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                users: true,
            });
        });
    });
});

describe("POST /api/v1/user", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).post("/api/v1/user").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, but nothing else", () => {
        test("should respond with a 400 status code", async () => {
            const res = await request(app).put("/api/v1/user").query({
                apiKey: 123,
            });
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({
                error: "Content-Type must be application/json",
            });
        });
    });
    describe("Providing an API Key, with a test user", () => {
        test("should respond with a 200 status code, and that a new user has been created", async () => {
            dbCreate.functionsForAllTables.insertTable.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                headers: { "content-type": "application/json" },
                body: {
                    username: "testuser",
                    password: "test",
                    email: "test@email.com",
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await userController.addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "A new user has been created",
            });
        });
    });
});

describe("POST /api/v1/gituser", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).post("/api/v1/gituser").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, with a test git user", () => {
        test("should respond with a 200 status code, and that a new user has been created", async () => {
            dbCreate.functionsForAllTables.insertTable.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                headers: { "content-type": "application/json" },
                body: {
                    username: "testuser",
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await userController.addGitUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "A new user has been created",
            });
        });
    });
});

describe("PUT /api/v1/user", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).put("/api/v1/user").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key, with a test git user", () => {
        test("should respond with a 200 status code, and that the user has been updated", async () => {
            dbCreate.functionsForAllTables.oneRowUpdateTable.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                headers: { "content-type": "application/json" },
                body: {
                    username: "testuser",
                    password: "newpassword",
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await userController.updateSpecificUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "The user has been updated",
            });
        });
    });
});

describe("GET /api/v1/user/:id", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).get("/api/v1/user/1").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key", () => {
        test("should respond with a 200 status code, and the specific user", async () => {
            db.gatheredUserFunctions.specificUser.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                params: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await userController.getSpecificUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                users: true,
            });
        });
    });
});

describe("GET /api/v1/gituser/:id", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).get("/api/v1/gituser/1").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key", () => {
        test("should respond with a 200 status code, and the specific user", async () => {
            db.gatheredUserFunctions.getUsernameFromGit.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                params: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await userController.getUserFromGitUsername(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                users: true,
            });
        });
    });
});

describe("GET /api/v1/email/:email_id", () => {
    describe("Not providing an API Key", () => {
        test("should respond with a 403 status code", async () => {
            const res = await request(app).get("/api/v1/email/1").query({});
            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual({ error: "Please provide an API key." });
        });
    });
    describe("Providing an API Key", () => {
        test("should respond with a 200 status code, and the specific user", async () => {
            db.gatheredUserFunctions.selectRowsWithEmail.mockResolvedValue(
                mockReturnValue,
            );

            const req = {
                query: { apiKey: 123 },
                params: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await userController.getUserFromEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                users: true,
            });
        });
    });
});
