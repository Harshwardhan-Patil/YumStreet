/* eslint-disable no-console */
import jwtToken from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/index.js';
import { STATUS_CODES } from '../constants.js';
import { UserRepository } from '../database/index.js';
import ApiError from '../utils/ApiErrors.js';

class Authenticator {
  static GenerateAccessToken(payload) {
    const token = jwtToken.sign(
      {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    return token;
  }

  static async VerifyToken(req, res, next) {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header('Authorization').replace('Bearer', '').trim();
      if (!token) {
        throw new ApiError(STATUS_CODES.UN_AUTHORIZED, 'Unauthorized request');
      }
      const verifiedToken = jwtToken.verify(token, ACCESS_TOKEN_SECRET);
      const userDb = new UserRepository();
      const user = await userDb.FindUserById(verifiedToken.id, {
        excludeAttributes: ['password'],
      });

      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
      }
      req.user = user.dataValues;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default Authenticator;
