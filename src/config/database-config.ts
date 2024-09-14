import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST) {
  throw new Error("Missing required environment variables for database connection");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",  
});

export default sequelize;
