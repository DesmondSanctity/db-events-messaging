import { Sequelize } from 'sequelize';
import {
 dbName,
 dbPassword,
 dbUsername,
 dbHost,
 dbEndpointId,
} from '../config/app.config.js';

const db = new Sequelize(dbName, dbUsername, dbPassword, {
 host: dbHost,
 dialect: 'postgres',
 dialectOptions: {
  project: dbEndpointId,
  ssl: {
   require: true,
   rejectUnauthorized: false,
  },
 },
 //  pool: {
 //   max: config.pool.max,
 //   min: config.pool.min,
 //   acquire: config.pool.acquire,
 //   idle: config.pool.idle,
 //  },
});

export default db;
