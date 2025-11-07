export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING, allowNull: false },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "users",
      timestamps: false
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "user_id",
      as: "posts",
    });

    User.belongsToMany(models.User, {
      through: models.Follow,
      as: "following",
      foreignKey: "follower_id",
      otherKey: "followee_id",
    });

    User.belongsToMany(models.User, {
      through: models.Follow,
      as: "followers",
      foreignKey: "followee_id",
      otherKey: "follower_id",
    });
  };

  return User;
};
