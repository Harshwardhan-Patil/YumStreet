import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { Address } from '../models/index.js';

class AddressRepository {
  constructor() {
    this.model = Address;
  }

  async CreateAddress(address) {
    try {
      const validAddressData = await Filter.GetValidAttributes(
        address,
        this.model
      );
      const createdAddress = await this.model.create(validAddressData);
      return createdAddress;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create address',
        error
      );
    }
  }

  async FindAddressById(id) {
    try {
      const address = await this.model.findByPk(id);
      return address;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find address',
        error
      );
    }
  }

  async FindAddressByAttributes(attributes) {
    try {
      const validAttributes = await Filter.GetValidAttributes(
        attributes,
        this.model
      );
      const address = await this.model.findAll({
        where: { ...validAttributes },
      });
      return address;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find address',
        error
      );
    }
  }

  async UpdateAddress(id, addressToUpdate) {
    try {
      const validAddressToUpdate = await Filter.GetValidAttributes(
        addressToUpdate,
        this.model
      );
      const [rowsUpdated, [updatedAddress]] = await this.model.update(
        validAddressToUpdate,
        {
          where: { id },
          returning: true,
        }
      );

      if (rowsUpdated <= 0) {
        throw new Error('Address not found');
      }
      return updatedAddress.dataValues;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update address',
        error
      );
    }
  }

  async DeleteAddressById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'this.model deleted successfully';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete address',
        error
      );
    }
  }
}

export default AddressRepository;
