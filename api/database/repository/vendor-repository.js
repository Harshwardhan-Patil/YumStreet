import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { Vendor } from '../models/index.js';

class VendorRepository {
  constructor() {
    this.model = Vendor;
  }

  async CreateVendor({
    name,
    description,
    isOpen,
    openingTime,
    closingTime,
    vendorImages,
    userId,
    addressId,
  }) {
    try {
      const vendor = await this.model.create({
        name,
        description,
        isOpen,
        openingTime,
        closingTime,
        vendorImages,
        userId,
        addressId,
      });
      return vendor;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create vendor'
      );
    }
  }

  async FindVendorById(id) {
    try {
      const vendor = await this.model.findByPk(id);
      return vendor;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find vendor');
    }
  }

  async FindAll(filter = {}) {
    try {
      const vendors = await this.model.findAll({ where: { ...filter } });
      return vendors;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find vendor');
    }
  }

  // TODO: Implement other find methods as you need
  async UpdateVendor(id, vendorDataToUpdate) {
    try {
      const validVendorDataToUpdate = await Filter.GetValidAttributes(
        vendorDataToUpdate,
        this.model
      );
      const vendor = await this.model.update(
        { validVendorDataToUpdate },
        { where: { id } }
      );
      return vendor;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update vendor'
      );
    }
  }

  async DeleteVendorById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Vendor deleted successfully';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete vendor'
      );
    }
  }
}

export default VendorRepository;
