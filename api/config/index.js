import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
    const configFile = `.env.${process.env.NODE_ENV}`
    dotenv.config(configFile);
} else {
    dotenv.config();
}

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;