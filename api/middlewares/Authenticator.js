/* eslint-disable no-underscore-dangle */
import jwtToken from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/index.js';
import { STATUS_CODES, UserRolesEnum } from '../constants.js';
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
      ACCESS_TOKEN_SECRET
    );

    return token;
  }

  static _ExtractToken(req) {
    return (
      req.cookies?.accessToken ||
      req.header('Authorization').replace('Bearer', '').trim()
    );
  }

  static async _VerifyToken(token) {
    let verifiedToken;
    try {
      verifiedToken = jwtToken.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.UN_AUTHORIZED,
        'Your session has expired. Please log in to continue.'
      );
    }
    const userDb = new UserRepository();
    const user = await userDb.FindUserById(verifiedToken.id, {
      excludeAttributes: ['password'],
    });

    if (!user) {
      throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
    }

    return user.dataValues;
  }

  static async VerifyToken(req, res, next) {
    try {
      const token = Authenticator._ExtractToken(req);
      if (!token) {
        throw new ApiError(STATUS_CODES.UN_AUTHORIZED, 'Unauthorized request');
      }

      req.user = await Authenticator._VerifyToken(token);
      next();
    } catch (error) {
      next(error);
    }
  }

  static async VerifyVendorToken(req, res, next) {
    try {
      const token = Authenticator._ExtractToken(req);
      if (!token) {
        throw new ApiError(STATUS_CODES.UN_AUTHORIZED, 'Unauthorized request');
      }

      const user = await Authenticator._VerifyToken(token);
      if (user.role !== UserRolesEnum.VENDOR) {
        throw new ApiError(STATUS_CODES.UN_AUTHORIZED, 'Unauthorized request');
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default Authenticator;
