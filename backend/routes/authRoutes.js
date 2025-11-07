import express from "express";
import { register, login } from "../controllers/authController.js";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: alice
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: alice
 *       409:
 *         description: Username already taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username already taken
 *       422:
 *         description: Validation error (missing or invalid input)
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: alice
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       422:
 *         description: Validation error (missing or invalid input)
 *       500:
 *         description: Server error
 */
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
