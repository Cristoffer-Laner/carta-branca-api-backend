import { Sequelize } from 'sequelize';

import * as dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_HOST, process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});