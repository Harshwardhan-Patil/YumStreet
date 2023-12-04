/* eslint-disable class-methods-use-this */
import {
  // OrderStatusEnum,
  STATUS_CODES,
} from '../../constants.js';
import { UserRepository, VendorRepository } from '../../database/index.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiErrors.js';
import Helper from '../../utils/Helper.js';
import { Address, Review, Order } from '../../database/models/index.js';
import FilterController from '../public/FilterController.js';

class VendorController {
  constructor() {
    this.vendorDb = new VendorRepository();
    this.userDb = new UserRepository();
  }

  async SearchVendor(req, res, next) {
    try {
      const { query, city } = req.query;
      const condition = city
        ? { include: [{ model: Address, where: { city } }, { model: Review }] }
        : { model: Review };
      const vendors = await this.vendorDb.FindVendorByLike(query, condition);

      const vendorsData = vendors.map((vendor) => {
        const { Reviews, license, ...vendorData } = vendor.dataValues;
        const averageRating = Helper.GetAverageRating(Reviews);
        return { ...vendorData, averageRating };
      });

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            vendorsData,
            'Vendors fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async GetNearByVendors(req, res, next) {
    try {
      const { latitude, longitude, limit = 25, page = 1 } = req.query;
      if (!latitude || !longitude) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'Provide users address properties'
        );
      }

      const locationInfo = await Helper.GetLocationFromLatLng(
        latitude,
        longitude
      );

      const city =
        locationInfo?.results[0].components.city ||
        locationInfo?.results[0].components.state_district;

      const paginatedVendors = await this.vendorDb.FindAll(
        {
          include: [
            { model: Address, where: { city } },
            { model: Review },
            { model: Order },
          ],
        },
        limit,
        page
      );

      if (!paginatedVendors) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'vendors not found');
      }

      const paginatedVendorData =
        await FilterController.ByPopularity(paginatedVendors);
      if (!paginatedVendorData) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'No vendors found');
      }

      const nearbyVendors = await FilterController.ByNearByVendors(
        paginatedVendorData,
        latitude,
        longitude
      );
      return res.status(STATUS_CODES.OK).json(
        new ApiResponse(
          STATUS_CODES.OK,
          {
            pagination: paginatedVendors.pagination,
            vendors: nearbyVendors,
          },
          'Vendors fetched successfully'
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async GetTrendingVendorsOfCity(req, res, next) {
    try {
      const { city } = req.params;
      const { limit, page } = req.query;
      const paginatedVendors = await this.vendorDb.FindAll(
        {
          include: [
            { model: Address, where: { city } },
            { model: Review },
            { model: Order },
          ],
        },
        limit,
        page
      );
      const trendingVendors =
        await FilterController.ByPopularity(paginatedVendors);
      const vendors = trendingVendors.map((vendor) => {
        const { Reviews, Orders, ...vendorData } = vendor;
        return vendorData;
      });

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { pagination: paginatedVendors.pagination, vendors },
            'Vendors fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default VendorController;
