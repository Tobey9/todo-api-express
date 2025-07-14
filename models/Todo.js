const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Todo = sequelize.define(
  "Todo",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Todo;
