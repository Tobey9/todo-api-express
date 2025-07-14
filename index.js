require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

require("./models/User");
require("./models/Todo");

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  sequelize.sync().then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}
