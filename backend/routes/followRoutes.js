import express from "express";
import { followUser, unfollowUser } from "../controllers/followController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/follow/:userid", authMiddleware, followUser);

router.delete("/follow/:userid", authMiddleware, unfollowUser);

export default router;
