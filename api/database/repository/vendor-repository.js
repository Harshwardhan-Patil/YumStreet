import { Op, Sequelize } from 'sequelize';
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

  async FindVendorByLike(query, options = {}) {
    try {
      const vendor = await this.model.findAll({
        where: { name: { [Op.iLike]: `%${query}%` } },
        ...options,
        limit: 25,
      });
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

  async FindAll(options = {}, modelLimit = 25, modelOffset = 1) {
    try {
      const { pagination, offset, limit } = await Helper.GetPaginationOptions(
        this.model,
        modelOffset,
        modelLimit
      );
      const vendors = await this.model.findAll({
        attributes: { exclude: ['license'] },
        ...options,
        limit,
        offset,
      });
      return { pagination, vendors: [...vendors] };
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
      let dataToUpdate = validVendorDataToUpdate;
      if ('vendorImages' in validVendorDataToUpdate) {
        dataToUpdate = {
          ...validVendorDataToUpdate,
          vendorImages: Sequelize.literal(
            `"vendorImages" || '[${JSON.stringify(
              validVendorDataToUpdate.vendorImages
            )}]'::jsonb`
          ),
        };
      }
      const vendor = await this.model.update(dataToUpdate, {
        where: { id, UserId },
        returning: true,
        plain: true,
      });
      if (vendor[0] <= 0) {
        throw new Error('User not found');
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
