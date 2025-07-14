const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Todo = require("../models/Todo");
require("./setupTestDB");

describe("Todos", () => {
  let token;
  const userData = {
    userName: "Todo Tester",
    email: "todouser@example.com",
    password: "testpass123",
  };

  beforeAll(async () => {
    await request(app).post("/users/register").send(userData);

    const res = await request(app).post("/users/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  afterEach(async () => {
    await Todo.destroy({ where: {} });
  });

  test("should create a new todo", async () => {
    const res = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Todo",
        description: "Make sure todo creation works",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Todo");
  });

  test("should get all todos for user", async () => {
    await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Get Todos",
        description: "To test the GET /todos route",
      });

    const res = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test("should fail to create todo without token", async () => {
    const res = await request(app).post("/todos").send({
      title: "No Token Todo",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message.toLowerCase()).toMatch(/no token|unauthorized/);
  });

  test("should update an existing todo", async () => {
    const createRes = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Original Title",
        description: "Original description",
      });

    const todoId = createRes.body.id;

    const updateRes = await request(app)
      .put(`/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Title",
        description: "Updated description",
      });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.title).toBe("Updated Title");
  });

  test("should delete an existing todo", async () => {
    const createRes = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Todo to Delete",
        description: "Will be deleted",
      });

    const todoId = createRes.body.id;

    const deleteRes = await request(app)
      .delete(`/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect([200, 204]).toContain(deleteRes.statusCode);
  });

  test("should not allow deleting without token", async () => {
    const res = await request(app).delete("/todos/123");

    expect(res.statusCode).toBe(401);
    expect(res.body.message.toLowerCase()).toMatch(/no token|unauthorized/);
  });
});
