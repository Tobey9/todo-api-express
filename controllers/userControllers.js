const { User } = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

module.exports.registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("Email already registered");
    error.status = 400;
    throw error;
  }

  const user = await User.create({ userName, email, password });
  const token = generateToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "lax",
    maxAge: 3600000,
  });

  res.status(201).json({ token });
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.validatePassword(password))) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = generateToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "lax",
    maxAge: 3600000,
  });

  res.status(200).json({ token });
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV == "production",
  });
  res.json({ message: "Logged out successfully" });
};
