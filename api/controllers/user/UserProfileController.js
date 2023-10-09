import { MAX_FILE_SIZE, STATUS_CODES } from '../../constants.js';
import { UserRepository } from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class UserProfileController {
  constructor() {
    this.db = new UserRepository();
  }

  async GetUserProfile(req, res, next) {
    try {
      const user = await this.db.FindUserById(req.user.id, {
        excludeAttributes: ['password'],
      });
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User profile not found');
      }

      console.log(await user.getAddress());

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...user.dataValues },
            'User profile fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateUserProfile(req, res, next) {
    try {
      const user = await this.db.UpdateUser(req.user.id, req.body);
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User profile not found');
      }

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...user },
            'User profile updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateUserProfileImage(req, res, next) {
    try {
      const { file } = req;
      if (!file.size > MAX_FILE_SIZE) {
        throw new ApiError('File size limit exceeded');
      }

      const avatar = {
        localPath: file.path,
      };

      const user = await this.db.UpdateUserAvatar(req.user.id, { avatar });

      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User profile not found');
      }

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { avatar: user.avatar },
            'User profile image updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default UserProfileController;
