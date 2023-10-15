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
  categoriesRouter,
} from './routes/index.js';

const initializeApp = (app) => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  app.use('/public', express.static(path.join(dirname, 'public')));

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors());

  //* routes*/
  app.use('/api/v1/category', categoriesRouter);

  app.use('/api/v1/users/', userAuthRouter);
  app.use('/api/v1/users/address', userAddressRouter);
  app.use('/api/v1/users/cart', userCartRouter);
  app.use('/api/v1/users/orders', userOrderRouter);
  app.use('/api/v1/users/profile', userProfileRouter);
  app.use('/api/v1/users/reviews', userReviewsRouter);

  app.use('/api/v1/vendors/', vendorAuthRouter);
  app.use('/api/v1/vendors/address', vendorAddressRouter);
  app.use('/api/v1/vendors/menu', vendorMenuItemRouter);
  app.use('/api/v1/vendors/orders', vendorOrderRouter);
  app.use('/api/v1/vendors/profile', vendorProfileRouter);
  app.use('/api/v1/vendors/reviews', vendorReviewsRouter);

  //* Error Handler
  app.use((err, req, res, next) => {
    ErrorHandler.handle(err, req, res, next);
  });
};

export default initializeApp;
