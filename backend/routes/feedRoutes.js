import express from "express";
import { getFeed } from "../controllers/feedController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feed
 *   description: Retrieve the feed of posts from followed users and self
 */

/**
 * @swagger
 * /api/feed:
 *   get:
 *     summary: Get the feed of posts from followed users
 *     tags: [Feed]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: Successfully retrieved feed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       user_id:
 *                         type: integer
 *                         example: 2
 *                       content:
 *                         type: string
 *                         example: "Just posted my first status!"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-07T10:30:00.000Z"
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.get("/feed", authMiddleware, getFeed);

export default router;
