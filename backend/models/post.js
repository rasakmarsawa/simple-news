export default (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.STRING(200), allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      tableName: "posts",
      timestamps: false
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };
    
  return Post;
};
