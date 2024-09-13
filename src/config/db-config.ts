import { Sequelize } from "sequelize-typescript";
import User from '../models/User'
const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    models: [User]
})

export default sequelize;