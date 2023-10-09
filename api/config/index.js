/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  const configFile = '.env.dev';
  dotenv.config(configFile);
} else {
  dotenv.config();
}

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
