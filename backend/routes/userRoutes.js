import express from "express";
import { query } from "express-validator";
import { getUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get(
  "/users/search",
  authMiddleware,
  [
    query("username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ max: 50 })
      .withMessage("Username max length is 50"),
  ],
  validateRequest,
  getUser
);

export default router;
