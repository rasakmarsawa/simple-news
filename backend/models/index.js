import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: env === 'development' ? console.log : false,
  }
);

// Dynamically import all model files
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.endsWith('.js') &&
      file !== basename &&
      !file.endsWith('.test.js')
  );

for (const file of modelFiles) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelPath);
  const modelFactory = modelModule.default || modelModule;
  const model = modelFactory(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Setup associations
Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
