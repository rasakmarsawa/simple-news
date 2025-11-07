import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "simple-feed-dev",
    host: process.env.DB_HOST || "db",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "simple-feed",
    host: process.env.DB_HOST || "db",
    dialect: "mysql"
  }  
};
