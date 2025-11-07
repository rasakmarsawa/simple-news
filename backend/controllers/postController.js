import db from "../models/index.js";

const Post = db.Post;

export const createPost = async (req, res) => {
  const { content } = req.body;

  try {
    const post = await Post.create({
      content,
      user_id: req.user.id,
    });

    return res.status(201).json({
      id: post.id,
      user_id: post.user_id,
      content: post.content,
      created_at: post.created_at,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
