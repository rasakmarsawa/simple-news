import db from "../models/index.js";

const User = db.User;
const Follow = db.Follow;

export const getUser = async (req, res) => {
  const { username } = req.query;
  const authUserId = req.user.id;

  try {
    const users = await User.findAll({
      where: {
        username: db.Sequelize.where(
          db.Sequelize.fn("LOWER", db.Sequelize.col("username")),
          "LIKE",
          `%${username.toLowerCase()}%`
        ),
      },
      attributes: ["id", "username"],
      limit: 20,
      order: [["username", "ASC"]],
      include: [
        {
          model: User,
          as: "followers", // as defined in User.belongsToMany
          where: { id: authUserId }, // filter by authenticated user
          required: false, // LEFT JOIN
          attributes: ["id"], // minimal fields
          through: { attributes: [] }, // do not include junction table fields
        },
      ],
    });

    const result = users.map((user) => ({
      id: user.id,
      username: user.username,
      isFollowing: user.followers.length > 0,
    }));

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
