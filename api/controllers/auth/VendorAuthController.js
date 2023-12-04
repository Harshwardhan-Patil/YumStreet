import { STATUS_CODES, UserRolesEnum } from '../../constants.js';
import {
  AddressRepository,
  UserRepository,
  VendorRepository,
} from '../../database/index.js';
import Authenticator from '../../middlewares/Authenticator.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';
import Password from '../../utils/Password.js';

class VendorAuthController {
  constructor() {
    this.db = new VendorRepository();
    this.userDb = new UserRepository();
    this.addressDb = new AddressRepository();
  }

  async Register(req, res, next) {
    try {
      let user = await this.userDb.FindUserById(req.user.id);
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
      }

      const isVendorExist = await this.db.FindVendorByUserId(req.user.id);
      if (isVendorExist) {
        throw new ApiError(
          STATUS_CODES.CONFLICT,
          'Vendor already exists for this user'
        );
      }

      const address = await this.addressDb.CreateAddress(req.body);

      const { images, license } = req.files;
      const vendorImages = images.map((file) => file.path);
      const data = { vendorImages, ...req.body, license: license[0].path };

      const vendor = await this.db.CreateVendor(data, user, address);
      if (!vendor) {
        throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Something went wrong');
      }
      const { license: vendorLicense, ...vendorData } = vendor.dataValues;
      user = await this.userDb.UpdateUser(req.user.id, {
        role: UserRolesEnum.VENDOR,
      });

      const accessToken = Authenticator.GenerateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      const options = {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      };

      return res
        .status(201)
        .cookie('accessToken', accessToken, options)
        .json(new ApiResponse(201, vendorData, 'Vendor created successfully'));
    } catch (error) {
      return next(error);
    }
  }

  async Login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await this.userDb.FindUserByEmail(email);
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
      }

      if (user.dataValues.role !== UserRolesEnum.VENDOR) {
        throw new ApiError(
          STATUS_CODES.UN_AUTHORIZED,
          'Access Denied: Only vendors are allowed to log in with this account.'
        );
      }

      const isPasswordCorrect = await Password.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new ApiError(STATUS_CODES.UN_AUTHORIZED, 'Invalid password');
      }
      const userVendor = await this.db.FindVendorByUserId(user.dataValues.id);
      if (!userVendor) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Vendor not found');
      }
      const { license, ...vendor } = userVendor.dataValues;

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
            { ...userData, accessToken, vendor },
            'User logged in successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default VendorAuthController;
