import db from "../models/index.js";
import { Op } from "sequelize";

const { Post, Follow, User } = db;

export const getFeed = async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // Get all followees (users that the current user follows)
    const followees = await Follow.findAll({
      where: { follower_id: userId },
      attributes: ["followee_id"],
    });

    // Collect all followee IDs + the current user
    const followeeIds = followees.map((f) => f.followee_id);
    followeeIds.push(userId);

    // Fetch posts with the username of each post's author
    const posts = await Post.findAll({
      where: { user_id: { [Op.in]: followeeIds } },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"], // only return username from user
        },
      ],
      order: [["created_at", "DESC"]],
      offset,
      limit,
    });

    return res.status(200).json({
      page,
      posts,
    });
  } catch (err) {
    console.error("Error fetching feed:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
