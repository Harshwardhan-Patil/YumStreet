import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import Helper from '../../utils/Helper.js';
import { Vendor } from '../models/index.js';

class VendorRepository {
  constructor() {
    this.model = Vendor;
  }

  async CreateVendor(vendorData, user, address) {
    try {
      const validVendorData = await Filter.GetValidAttributes(
        vendorData,
        this.model
      );
      const vendor = await this.model.create(validVendorData);
      await vendor.setUser(user);
      await vendor.setAddress(address);
      return vendor;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create vendor',
        error
      );
    }
  }

  async FindVendorById(id) {
    try {
      const vendor = await this.model.findByPk(id);
      return vendor;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find vendor',
        error
      );
    }
  }

  async FindVendorByIdWithModel(id, inCludeModel = []) {
    if (inCludeModel.length <= 0) {
      return this.FindVendorById(id);
    }
    const vendor = await this.model.findByPk(id, { include: inCludeModel });
    return vendor;
  }

  async FindVendorByUserId(UserId) {
    try {
      const vendor = await this.model.findOne({ where: { UserId } });
      return vendor;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find vendor',
        error
      );
    }
  }

  async FindAll(filter = {}) {
    try {
      const vendors = await this.model.findAll({ where: { ...filter } });
      return vendors;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find vendor',
        error
      );
    }
  }
  // TODO: Implement other find methods as you need

  async UpdateVendor(id, UserId, vendorDataToUpdate) {
    try {
      const validVendorDataToUpdate = await Filter.GetValidAttributes(
        vendorDataToUpdate,
        this.model
      );
      let images = [];
      // Helps remove old local files when vendorImages update.
      if ('vendorImages' in validVendorDataToUpdate) {
        const vendor = await this.model.findByPk(id, {
          attributes: ['vendorImages'],
        });
        images = vendor.dataValues.vendorImages;
      }

      const vendor = await this.model.update(validVendorDataToUpdate, {
        where: { id, UserId },
        returning: true,
        plain: true,
      });

      if (vendor[0] <= 0) {
        throw new Error('User not found');
      }
      if ('vendorImages' in validVendorDataToUpdate) {
        images.forEach((imagePath) => Helper.RemoveLocalFile(imagePath));
      }
      return vendor[1];
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update vendor',
        error
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
        'Unable to delete vendor',
        error
      );
    }
  }
}

export default VendorRepository;
