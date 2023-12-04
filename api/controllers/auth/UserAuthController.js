import { STATUS_CODES } from '../../constants.js';
import { UserRepository } from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import Password from '../../utils/Password.js';
import ApiResponse from '../../utils/ApiResponse.js';
import Authenticator from '../../middlewares/Authenticator.js';

class UserAuthController {
  constructor() {
    this.db = new UserRepository();
  }

  async Register(req, res, next) {
    const { firstname, lastname, email, password, role } = req.body;
    try {
      const isUserExist = await this.db.FindUserByEmail(email);
      if (isUserExist) {
        throw new ApiError(
          STATUS_CODES.CONFLICT,
          'User with email already exists'
        );
      }

      const hashedPassword = await Password.hash(password);
      const user = await this.db.CreateUser({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role,
      });

      const { password: userHashedPassword, ...userData } = user.dataValues;

      return res
        .status(201)
        .json(new ApiResponse(201, userData, 'User created successfully'));
    } catch (error) {
      return next(error);
    }
  }

  async Login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await this.db.FindUserByEmail(email);
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
      }

      const isPasswordCorrect = await Password.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new ApiError(STATUS_CODES.UN_AUTHORIZED, 'Invalid password');
      }

      const accessToken = Authenticator.GenerateAccessToken({
        id: user.dataValues.id,
        email: user.dataValues.email,
        role: user.dataValues.role,
      });

      const { password: userHashedPassword, ...userData } = user.dataValues;

      const options = {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      };

      return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...userData, accessToken },
            'User logged in successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  Logout(req, res, next) {
    try {
      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
      };

      return res
        .status(200)
        .cookie('accessToken', '', options)
        .json(
          new ApiResponse(STATUS_CODES.OK, {}, 'User logged out successfully')
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default UserAuthController;
