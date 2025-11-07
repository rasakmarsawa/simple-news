import express from "express";
import { register, login } from "../controllers/authController.js";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  register
);

// Login
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

export default router;
