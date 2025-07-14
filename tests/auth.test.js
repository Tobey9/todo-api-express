const request = require("supertest");
const app = require("../app"); // ✅ not index.js
const db = require("../config/database");
const User = require("../models/User"); // make sure models are imported so they get registered
require("./setupTestDB");

describe("User Auth", () => {
  const userData = {
    userName: "Test User",
    email: "testuser@example.com",
    password: "password123",
  };

  test("should register a new user and return a token", async () => {
    const res = await request(app).post("/users/register").send(userData);
    console.log("REGISTER RESPONSE:", res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("should not register the same email again", async () => {
    const res = await request(app).post("/users/register").send(userData);
    console.log("DUPLICATE REGISTER RESPONSE:", res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/already registered/i);
  });

  test("should login with correct credentials", async () => {
    const res = await request(app).post("/users/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("should fail login with incorrect password", async () => {
    const res = await request(app).post("/users/login").send({
      email: userData.email,
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
  });
});
