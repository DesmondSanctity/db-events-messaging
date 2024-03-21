import { Sequelize } from 'sequelize';
import {
 dbName,
 dbPassword,
 dbUsername,
 dbHost,
} from '../config/app.config.js';

const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  timezone: "+01:00",
});

export default db;
