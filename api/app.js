import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
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
  vendorRouter,
  searchRouter,
  filterRouter,
} from './routes/index.js';
import { CORS_ORIGIN } from './config/index.js';
import Io from './sockets/index.js';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: CORS_ORIGIN,
    credentials: true,
  },
});

app.set('io', io);
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use('/public', express.static(path.join(dirname, 'public')));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

//* routes*/
app.use('/api/v1/category', categoriesRouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/filter', filterRouter);

app.use('/api/v1/users/', userAuthRouter);
app.use('/api/v1/users/address', userAddressRouter);
app.use('/api/v1/users/cart', userCartRouter);
app.use('/api/v1/users/order', userOrderRouter);
app.use('/api/v1/users/profile', userProfileRouter);
app.use('/api/v1/users/review', userReviewsRouter);

app.use('/api/v1/vendors/', vendorAuthRouter);
app.use('/api/v1/vendors/', vendorRouter);
app.use('/api/v1/vendors/address', vendorAddressRouter);
app.use('/api/v1/vendors/menu', vendorMenuItemRouter);
app.use('/api/v1/vendors/order', vendorOrderRouter);
app.use('/api/v1/vendors/profile', vendorProfileRouter);
app.use('/api/v1/vendors/review', vendorReviewsRouter);

Io.initializeSocketIO(io);

//* Error Handler
app.use((err, req, res, next) => {
  ErrorHandler.handle(err, req, res, next);
});

export default httpServer;
