import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL;
const port = process.env.APP_PORT;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpires = process.env.JWT_EXPIRES;
const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD || '';
const dbUsername = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;

export {
 baseURL,
 port,
 jwtSecret,
 jwtExpires,
 dbName,
 dbPassword,
 dbUsername,
 dbHost,
};
