import { STATUS_CODES } from '../../constants.js';
import { VendorRepository, AddressRepository } from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class VendorAddressController {
  constructor() {
    this.vendorDb = new VendorRepository();
    this.addressDb = new AddressRepository();
  }

  async GetVendorAddress(req, res, next) {
    try {
      const vendorAddress = await this.addressDb.FindAddressById(
        req.params.addressId
      );

      if (!vendorAddress) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Address not found');
      }

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...vendorAddress.dataValues },
            'Vendor address fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateVendorAddress(req, res, next) {
    try {
      if (!req.body.vendorId) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'Please provide vendor Id'
        );
      }
      const vendor = await this.vendorDb.FindVendorByIdWithModel(
        req.body.vendorId,
        ['Address']
      );
      if (!vendor) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'vendor not found');
      }
      const address = vendor.dataValues.Address.dataValues;
      if (!address) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Address not found');
      }
      const vendorAddress = await this.addressDb.UpdateAddress(
        address.id,
        req.body
      );

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...vendorAddress },
            'Vendor address updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default VendorAddressController;
