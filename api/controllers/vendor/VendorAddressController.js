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
      const { addressId } = req.params;
      if (!addressId) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'Provided address id not present'
        );
      }
      const vendorAddress = await this.addressDb.UpdateAddress(
        addressId,
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
