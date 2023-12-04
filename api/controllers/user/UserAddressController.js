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
      const address = await this.addressDb.FindAddressById(req.query.addressId);

      if (!address) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Address not found');
      }
      let userAddress;
      if (JSON.parse(req.query.user)) {
        const user = await this.userDb.FindUserById(req.user.id);
        const { password, ...userData } = user.dataValues;
        userAddress = { ...userData, ...address.dataValues };
      } else {
        userAddress = { ...address.dataValues };
      }
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            userAddress,
            'User address fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async GetAllUserAddress(req, res, next) {
    try {
      const user = await this.userDb.FindUserById(req.user.id);
      let userAddress;
      if (JSON.parse(req.query.user)) {
        const { password, ...userData } = user.dataValues;
        const address = await user.getAddresses();
        userAddress = { ...userData, address };
      } else {
        userAddress = await user.getAddresses();
      }
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            userAddress,
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
      user.addAddress(address);

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
      const address = await this.addressDb.FindAddressById(
        req.user.AddressId || req.params.addressId
      );

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
            userAddress,
            'User address updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async DeleteUserAddress(req, res, next) {
    try {
      const address = this.addressDb.DeleteAddressById(req.params.addressId);
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            address,
            'User address updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default UserAddressController;
