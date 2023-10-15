import { STATUS_CODES } from '../../constants.js';
import {
  AddressRepository,
  UserRepository,
  VendorRepository,
} from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class VendorAuthController {
  constructor() {
    this.db = new VendorRepository();
    this.userDb = new UserRepository();
    this.addressDb = new AddressRepository();
  }

  async Register(req, res, next) {
    try {
      const isVendorExist = await this.db.FindVendorByUserId(req.user.id);
      if (isVendorExist) {
        throw new ApiError(
          STATUS_CODES.CONFLICT,
          'Vendor already exists for this user'
        );
      }
      const user = await this.userDb.FindUserById(req.user.id);
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
      }

      const address = await this.addressDb.CreateAddress(req.body);
      const { images, license } = req.files;
      const vendorImages = images.map((file) => file.path);
      const data = { vendorImages, ...req.body, license: license[0].path };
      const vendor = await this.db.CreateVendor(data, user, address);

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { ...vendor.dataValues },
            'Vendor created successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default VendorAuthController;
