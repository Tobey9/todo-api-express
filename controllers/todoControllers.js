const sanitizeHtml = require("sanitize-html");
const { Todo } = require("../models");

const { Op } = require("sequelize");

const sanitize = (text) =>
  sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });

module.exports.createTodo = async (req, res) => {
  const title = sanitize(req.body.title);
  const description = sanitize(req.body.description || "");

  const todo = await Todo.create({
    title,
    description,
    userId: req.user.id,
  });

  res.status(201).json(todo);
};

module.exports.getTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const search = req.query.search || "";

  const { count, rows: todos } = await Todo.findAndCountAll({
    where: {
      userId: req.user.id,
      title: {
        [Op.like]: `%${search}%`, // case-insensitive LIKE (Postgres), use Op.like for MySQL
      },
    },
    offset,
    limit,
    order: [["createdAt", "DESC"]],
  });

  res.json({
    data: todos,
    page,
    limit,
    total: count,
  });
};

module.exports.updateTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByPk(id);

  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (todo.userId !== req.user.id)
    return res.status(403).json({ message: "You're not authorized to update" });

  const title = sanitize(req.body.title);
  const description = sanitize(req.body.description);

  todo.title = title;
  todo.description = description;
  await todo.save();

  res.json(todo);
};

module.exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByPk(id);

  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (todo.userId !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  await todo.destroy();
  res.status(204).send();
};
