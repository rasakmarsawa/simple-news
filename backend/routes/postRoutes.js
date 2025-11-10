import express from "express";
import { createPost } from "../controllers/postController.js";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

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
