import express from "express";
import { register, login } from "../controllers/authController.js";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .trim()
      .escape()
      .notEmpty().withMessage("Username is required")
      .isLength({ min: 3, max: 50 }).withMessage("Username must be 3–50 characters long")
      .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),
    body("password")
      .trim()
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  register
);


router.post(
  "/login",
  [
    body("username")
      .trim()
      .escape()
      .notEmpty().withMessage("Username is required"),
    body("password")
      .trim()
      .notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

export default router;
