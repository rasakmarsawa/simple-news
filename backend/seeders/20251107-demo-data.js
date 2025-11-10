import bcrypt from "bcryptjs";

export async function up(queryInterface, Sequelize) {
  // Check if users already exist
  const users = await queryInterface.sequelize.query(
    `SELECT COUNT(*) AS count FROM users;`,
    { type: Sequelize.QueryTypes.SELECT }
  );

  if (users[0].count > 0) {
    console.log("🟡 Users already exist, skipping seed...");
    return;
  }

  console.log("🌱 Seeding initial data...");

  // Hash passwords
  const password = await bcrypt.hash("password", 10);

  // Insert users
  await queryInterface.bulkInsert("users", [
    { id: 1, username: "alice", password_hash: password, created_at: new Date() },
    { id: 2, username: "bob", password_hash: password, created_at: new Date() },
    { id: 3, username: "charlie", password_hash: password, created_at: new Date() },
  ]);

  // Insert follow relationships
  await queryInterface.bulkInsert("follows", [
    { follower_id: 1, followee_id: 2, created_at: new Date() },
    { follower_id: 1, followee_id: 3, created_at: new Date() },
    { follower_id: 2, followee_id: 3, created_at: new Date() },
  ]);

  // Insert posts
  await queryInterface.bulkInsert("posts", [
    { user_id: 1, content: "Hello world from Alice!", created_at: new Date() },
    { user_id: 2, content: "Bob here posting something!", created_at: new Date() },
    { user_id: 3, content: "Charlie says hi!", created_at: new Date() },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("posts", null, {});
  await queryInterface.bulkDelete("follows", null, {});
  await queryInterface.bulkDelete("users", null, {});
}
