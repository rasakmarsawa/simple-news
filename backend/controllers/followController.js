import db from "../models/index.js";

const Follow = db.Follow;
const User = db.User;

export const followUser = async (req, res) => {
  const followerId = req.user.id;
  const followeeId = parseInt(req.params.userid);

  if (followerId === followeeId) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  try {
    const followee = await User.findByPk(followeeId);
    if (!followee) return res.status(404).json({ message: "User not found" });

    const existing = await Follow.findOne({ 
      where: { follower_id: followerId, followee_id: followeeId } 
    });
    if (existing) return res.status(400).json({ message: `Already following user ${followeeId}` });

    await Follow.create({ follower_id: followerId, followee_id: followeeId });

    return res.status(200).json({ message: `You are now following user ${followeeId}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const unfollowUser = async (req, res) => {
  const followerId = req.user.id;
  const followeeId = parseInt(req.params.userid);

  try {
    const follow = await Follow.findOne({ 
      where: { follower_id: followerId, followee_id: followeeId } 
    });
    if (!follow) return res.status(400).json({ message: `You are not following user ${followeeId}` });

    await follow.destroy();

    return res.status(200).json({ message: `You unfollowed user ${followeeId}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
