import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import Helper from '../../utils/Helper.js';
import { Address, User } from '../models/index.js';

class UserRepository {
  constructor() {
    this.model = User;
  }

  async CreateUser(userData) {
    try {
      const validUserData = await Filter.GetValidAttributes(userData, User);
      const user = await this.model.create({ ...validUserData });
      return user;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create user',
        error
      );
    }
  }

  async FindUserById(
    id,
    { includeAttributes = [], excludeAttributes = [] } = {}
  ) {
    let attributes = [];
    if (includeAttributes.length > 0) {
      attributes = await Filter.GetValidAttributes(
        includeAttributes,
        this.model
      );
    } else {
      attributes = await Filter.GetValidAttributes(
        excludeAttributes,
        this.model,
        false
      );
    }
    try {
      const user =
        attributes.length > 0
          ? await this.model.findByPk(id, { attributes })
          : await this.model.findByPk(id);
      return user;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find user',
        error
      );
    }
  }

  async FindUserByEmail(
    email,
    { includeAttributes = [], excludeAttributes = [] } = {}
  ) {
    let attributes = [];
    if (includeAttributes.length > 0) {
      attributes = await Filter.GetValidAttributes(
        includeAttributes,
        this.model
      );
    } else {
      attributes = await Filter.GetValidAttributes(
        excludeAttributes,
        this.model,
        false
      );
    }
    try {
      const user =
        attributes.length > 0
          ? await this.model.findOne({
              where: { email },
              attributes,
            })
          : await this.model.findOne({
              where: { email },
            });

      return user;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find user',
        error
      );
    }
  }

  async FindUserAndAddress(
    id,
    { includeAttributes = [], excludeAttributes = [] } = {}
  ) {
    let attributes = [];
    if (includeAttributes.length > 0) {
      attributes = await Filter.GetValidAttributes(
        includeAttributes,
        this.model
      );
    } else {
      attributes = await Filter.GetValidAttributes(
        excludeAttributes,
        this.model,
        false
      );
    }

    const user = await this.model.findByPk(id, {
      attributes,
      include: Address,
    });
    return user;
  }

  async UpdateUser(id, userData) {
    try {
      const { password, ...userDataToUpdate } = userData;
      const validUserDataToUpdate = await Filter.GetValidAttributes(
        userDataToUpdate,
        this.model
      );
      if ('avatar' in validUserDataToUpdate) {
        await this.UpdateUserAvatar(id, {
          avatar: validUserDataToUpdate.avatar,
        });
      }

      const { avatar, ...otherUserData } = validUserDataToUpdate;
      const [rowsUpdated, [updatedUser]] = await this.model.update(
        { ...otherUserData },
        {
          where: { id },
          returning: true,
        }
      );
      if (rowsUpdated <= 0) {
        throw new Error('User not found');
      }
      const { password: userPassword, ...userUpdatedData } =
        updatedUser.dataValues;
      return userUpdatedData;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update user',
        error
      );
    }
  }

  async UpdateUserAvatar(id, avatar) {
    try {
      const user = await this.model.findByPk(id, { attributes: ['avatar'] });
      const localFilePath = user.dataValues.avatar.localPath;
      const [rowsUpdated, [updatedUser]] = await this.model.update(avatar, {
        where: { id },
        returning: true,
      });
      if (rowsUpdated <= 0) {
        throw new Error('User not found');
      }
      const { password: userPassword, ...userUpdatedData } =
        updatedUser.dataValues;
      Helper.RemoveLocalFile(localFilePath);
      return userUpdatedData;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update user profile image',
        error
      );
    }
  }

  async DeleteUserById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'successfully deleted user';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete user',
        error
      );
    }
  }
}

export default UserRepository;
