import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import ErrorHandler from './middlewares/ErrorHandler.js';
import {
  userAuthRouter,
  userAddressRouter,
  userCartRouter,
  userOrderRouter,
  userProfileRouter,
  userReviewsRouter,
  vendorAddressRouter,
  vendorAuthRouter,
  vendorMenuItemRouter,
  vendorOrderRouter,
  vendorProfileRouter,
  vendorReviewsRouter,
} from './routes/index.js';

const initializeApp = (app) => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  app.use('/public', express.static(path.join(dirname, 'public')));

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors());

  //* routes*/
  app.use('/api/v1/users/', userAuthRouter);
  app.use('/api/v1/users/:userId/address', userAddressRouter);
  app.use('/api/v1/users/:userId/cart', userCartRouter);
  app.use('/api/v1/users/:userId/orders', userOrderRouter);
  app.use('/api/v1/users/:userId/profile', userProfileRouter);
  app.use('/api/v1/users/:userId/reviews', userReviewsRouter);

  app.use('/api/v1/vendors/', vendorAuthRouter);
  app.use('/api/v1/vendors/:vendorId/address', vendorAddressRouter);
  app.use('/api/v1/vendors/:vendorId/menu', vendorMenuItemRouter);
  app.use('/api/v1/vendors/:vendorId/orders', vendorOrderRouter);
  app.use('/api/v1/vendors/:vendorId/profile', vendorProfileRouter);
  app.use('/api/v1/vendors/:vendorId/reviews', vendorReviewsRouter);

  //* Error Handler
  app.use((err, req, res, next) => {
    ErrorHandler.handle(err, req, res, next);
  });
};

export default initializeApp;
