const db = require("../config/database");
const { User, Todo } = require("../models");

beforeAll(async () => {
  try {
    await db.sync({ force: true });
    console.log("✅ Test DB synced successfully.");
  } catch (err) {
    console.error("❌ Error syncing DB:", err);
  }
});

afterAll(async () => {
  await db.close();
});
