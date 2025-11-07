export default (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      follower_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      followee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "follows",
      timestamps: false
    }
  );

  Follow.associate = (models) => {
    Follow.belongsTo(models.User, {
      foreignKey: "follower_id",
      as: "follower",
    });
    Follow.belongsTo(models.User, {
      foreignKey: "followee_id",
      as: "followee",
    });
  };
    
  return Follow;
};
