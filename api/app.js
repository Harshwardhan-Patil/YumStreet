import express from 'express';
import cors from 'cors';


const initializeApp = (app) => {
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
}

export default initializeApp;