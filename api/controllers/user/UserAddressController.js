import { STATUS_CODES } from '../../constants.js';
import { UserRepository, AddressRepository } from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class UserAddressController {
  constructor() {
    this.userDb = new UserRepository();
    this.addressDb = new AddressRepository();
  }

  async GetUserAddress(req, res, next) {
    try {
      const userAddress = await this.addressDb.FindAddressById(
        req.params.addressId
      );

      if (!userAddress) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Address not found');
      }

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...userAddress.dataValues },
            'User address fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async CreateUserAddress(req, res, next) {
    try {
      const user = await this.userDb.FindUserById(req.user.id);
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
      }

      const address = await this.addressDb.CreateAddress(req.body);
      user.setAddress(address);

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { address },
            'User address created successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateUserAddress(req, res, next) {
    try {
      const user = await this.userDb.FindUserAndAddress(req.user.id, {
        excludeAttributes: 'password',
      });
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
      }
      const address = user.Address.dataValues;
      if (!address) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Address not found');
      }
      const userAddress = await this.addressDb.UpdateAddress(
        address.id,
        req.body
      );

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...userAddress },
            'User address updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default UserAddressController;
