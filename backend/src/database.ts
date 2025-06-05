import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
    host: process.env.DEV_MODE === 'true' ? process.env.DB_HOST_DEV : process.env.DB_HOST_PROD,
    user: process.env.DEV_MODE === 'true' ? process.env.DB_USER_DEV : process.env.DB_USER_PROD,
    password: process.env.DEV_MODE === 'true' ? process.env.DB_PASS_DEV : process.env.DB_PASS_PROD,
    database: process.env.DEV_MODE === 'true' ? process.env.DB_NAME_DEV : process.env.DB_NAME_PROD,
});