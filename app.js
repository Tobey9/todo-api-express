const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const rateLimit = require("express-rate-limit");

// Basic rate limit: 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: { message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter); // Apply to all routes

app.use(express.json());
app.use(cookieParser());

app.use("/todos", require("./routes/todoRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler); // At the end of all routes

module.exports = app;
