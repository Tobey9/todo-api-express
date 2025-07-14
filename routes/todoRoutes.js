const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");

const { validate, schemas } = require("../utils/validate");
const authVerify = require("../middlewares/authVerify");
const catchAsync = require("../utils/catchAsync");

router.use(authVerify);

router.post("/", validate(schemas.todoSchema), catchAsync(createTodo));

router.get("/", catchAsync(getTodos));

router.put("/:id", validate(schemas.todoSchema), catchAsync(updateTodo));

router.delete("/:id", catchAsync(deleteTodo));

module.exports = router;
