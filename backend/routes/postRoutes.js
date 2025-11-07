import express from "express";
import { createPost } from "../controllers/postController.js";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management endpoints
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post (max 200 characters)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 maxLength: 200
 *                 example: "Just finished building my first Node.js API!"
 *     responses:
 *       201:
 *         description: Post successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 12
 *                 user_id:
 *                   type: integer
 *                   example: 3
 *                 content:
 *                   type: string
 *                   example: "Just finished building my first Node.js API!"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-11-07T09:45:00Z"
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       422:
 *         description: Validation error (invalid content format)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Content max length is 200"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */
router.post(
  "/posts",
  [
    body("content")
      .trim()
      .escape()
      .notEmpty().withMessage("Content is required")
      .isLength({ max: 200 }).withMessage("Content max length is 200"),
  ],
  authMiddleware,
  validateRequest,
  createPost
);

export default router;
