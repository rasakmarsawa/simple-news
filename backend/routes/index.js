import express from "express";
import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";
import followRoutes from "./followRoutes.js";
import feedRoutes from "./feedRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/api", authRoutes);
router.use("/api", postRoutes);
router.use("/api", followRoutes);
router.use("/api", feedRoutes);
router.use("/api", userRoutes);

export default router;
