const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/userControllers");
const catchAsync = require("../utils/catchAsync");
const { validate, schemas } = require("../utils/validate");

router.post(
  "/register",
  validate(schemas.registerSchema),
  catchAsync(registerUser)
);
router.post("/login", validate(schemas.loginSchema), catchAsync(loginUser));
router.post("/logout", catchAsync(logout));

module.exports = router;
