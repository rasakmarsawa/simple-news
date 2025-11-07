import express from "express";
import { getFeed } from "../controllers/feedController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/feed", authMiddleware, getFeed);

export default router;
