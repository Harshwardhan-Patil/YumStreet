import { STATUS_CODES } from '../../constants.js';
import {
  AddressRepository,
  UserRepository,
  VendorRepository,
} from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';
import Helper from '../../utils/Helper.js';

class VendorProfileController {
  constructor() {
    this.db = new VendorRepository();
    this.userDb = new UserRepository();
    this.addressDb = new AddressRepository();
  }

  async GetVendorProfile(req, res, next) {
    try {
      const { vendorId } = req.params;
      const Addresses = ['1', 'yes', 'true'];
      const isAddress = Addresses.includes(req.query.isAddress);
      if (!vendorId) {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Provide vendorId');
      }

      const vendor = isAddress
        ? await this.db.FindVendorByIdWithModel(vendorId, [
            'Address',
            'Reviews',
          ])
        : await this.db.FindVendorById(vendorId);

      if (!vendor) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Vendor not found');
      }
      const { Reviews, license, ...vendorData } = vendor.dataValues;
      const averageRating = Helper.GetAverageRating(Reviews);
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            ...vendorData,
            reviewCount: Reviews.length,
            averageRating,
          },
          'Vendor find successfully'
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateVendorProfile(req, res, next) {
    try {
      const { vendorId } = req.params;
      if (!vendorId) {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Provide vendorId');
      }
      let images = '';
      images =
        req.files && req.files.images
          ? req.files.images.map((file) => file.path)
          : [];
      const body =
        images.length > 0 ? { vendorImages: images, ...req.body } : req.body;
      const vendor = await this.db.UpdateVendor(vendorId, req.user.id, body);
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { ...vendor.dataValues },
            'Vendor updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default VendorProfileController;
