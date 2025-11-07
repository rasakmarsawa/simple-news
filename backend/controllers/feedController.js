import db from "../models/index.js";
import { Op } from "sequelize";

const Post = db.Post;
const Follow = db.Follow;

export const getFeed = async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const followees = await Follow.findAll({
      where: { follower_id: userId },
      attributes: ["followee_id"]
    });

    const followeeIds = followees.map(f => f.followee_id);
    followeeIds.push(userId);

    const posts = await Post.findAll({
      where: { user_id: { [Op.in]: followeeIds } },
      order: [["created_at", "DESC"]],
      offset,
      limit
    });

    return res.status(200).json({ page, posts: posts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
