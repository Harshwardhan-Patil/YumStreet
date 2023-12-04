/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.dev' });
} else {
  dotenv.config();
}

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const OPEN_CAGE_DATA_API_KEY = process.env.OPEN_CAGE_DATA_API_KEY;
