/* eslint-disable class-methods-use-this */
import { MAXIMUM_DELIVERY_DISTANCE, STATUS_CODES } from '../../constants.js';
import {
  CategoryRepository,
  UserRepository,
  VendorRepository,
} from '../../database/index.js';
import Address from '../../database/models/Address.js';
import Category from '../../database/models/Category.js';
import MenuItem from '../../database/models/MenuItem.js';
import Order from '../../database/models/Order.js';
import Review from '../../database/models/Review.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';
import Helper from '../../utils/Helper.js';

class FilterController {
  constructor() {
    this.vendorDb = new VendorRepository();
    this.userDb = new UserRepository();
    this.categoryDb = new CategoryRepository();
  }

  static async ByPopularity(paginatedVendors) {
    try {
      const weights = {
        order: 0.6,
        rating: 0.3,
        completionTime: 0.1,
      };

      const vendorInfos = paginatedVendors.vendors.map((vendorInfo) => {
        const vendor = vendorInfo.dataValues;
        const orders = vendor.Orders;
        const reviews = vendor.Reviews;
        let totalRating = 0;
        let averageRating = 0.0;
        let completionTime = 0;

        if (reviews.length > 0) {
          totalRating = reviews.reduce((acc, review) => {
            return acc + parseInt(review.dataValues.rating, 10);
          }, 0);
          averageRating = totalRating / reviews.length;
        }

        const orderCount = orders.length;

        if (orderCount > 0) {
          const totalCompletionTime = orders.reduce((acc, order) => {
            if (!order.dataValues.completedAt || !order.dataValues.orderDate)
              return acc;
            const time =
              acc +
              (order.dataValues.completedAt.getTime() -
                order.dataValues.orderDate.getTime()) /
                (1000 * 60);
            return time;
          }, 0);
          completionTime = totalCompletionTime / orderCount;
        }
        return { averageRating, orderCount, completionTime, ...vendor };
      });

      const vendorsByScores = vendorInfos.map((vendor) => {
        const { orderCount, averageRating, completionTime } = vendor;
        const score =
          orderCount * weights.order +
          averageRating * weights.rating -
          completionTime * weights.completionTime;
        return { score, ...vendor };
      });

      const trendingVendors = vendorsByScores.sort(
        (vendorA, vendorB) => vendorB.score - vendorA.score
      );
      return trendingVendors;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Something went wrong',
        error
      );
    }
  }

  static async ByNearByVendors(paginatedVendorData, latitude, longitude) {
    const vendorDistance = paginatedVendorData.map((vendor) => {
      const distance = Helper.haversineDistance(
        latitude,
        longitude,
        vendor.Address.latitude,
        vendor.Address.longitude
      );

      return { ...vendor, distance };
    });

    const VendorsWithinDeliveryRange = vendorDistance.filter(
      (vendor) => MAXIMUM_DELIVERY_DISTANCE > vendor.distance
    );

    const nearbyVendors = VendorsWithinDeliveryRange.sort(
      (vendor1, vendor2) => vendor1.distance - vendor2.distance
    );

    return nearbyVendors;
  }

  // Must have Reviews property in vendor Data
  static async ByRating(vendorsData) {
    try {
      const vendorInfos = vendorsData.vendors.map((vendorInfo) => {
        const vendor = vendorInfo.dataValues;
        const reviews = vendor.Reviews;
        let totalRating = 0;
        let averageRating = 0.0;

        if (vendor.Reviews.length > 0) {
          totalRating = reviews.reduce((acc, review) => {
            return acc + parseInt(review.dataValues.rating, 10);
          }, 0);
          averageRating = totalRating / vendor.Reviews.length;
        }
        return { averageRating, ...vendor };
      });
      const vendorsByRating = vendorInfos.sort(
        (a, b) => b.averageRating - a.averageRating
      );

      return vendorsByRating;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Something went wrong',
        error
      );
    }
  }

  // Must have Orders property in vendor Data
  static async ByDeliveryTime(vendorsData) {
    try {
      const vendorInfos = vendorsData.vendors.map((vendorInfo) => {
        const vendor = vendorInfo.dataValues;
        const orders = vendor.Orders;
        let completionTime = 0;
        const orderCount = orders.length;

        if (orderCount > 0) {
          const totalCompletionTime = orders.reduce((acc, order) => {
            if (!order.dataValues.completedAt || !order.dataValues.orderDate)
              return acc;
            const time =
              acc +
              (order.dataValues.completedAt.getTime() -
                order.dataValues.orderDate.getTime()) /
                (1000 * 60);
            return time;
          }, 0);
          completionTime = totalCompletionTime / orderCount;
        }
        return { completionTime, ...vendor };
      });

      const vendorsByDeliveryTime = vendorInfos.sort(
        (a, b) => a.completionTime - b.completionTime
      );

      return vendorsByDeliveryTime;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Something went wrong',
        error
      );
    }
  }

  static async ByCost(vendorsData, range = 'LowToHigh') {
    try {
      const vendorInfos = vendorsData.vendors.map((vendorInfo) => {
        const vendor = vendorInfo.dataValues;
        const menuItems = vendor.MenuItems;
        let totalPrice = 0;
        let averagePrice = 0.0;

        if (menuItems.length > 0) {
          totalPrice = menuItems.reduce((sum, menuItem) => {
            return sum + parseInt(menuItem.dataValues.price, 10);
          }, 0);
          averagePrice = totalPrice / menuItems.length;
        }
        return { averagePrice, ...vendor };
      });
      const sortFunction =
        range === 'LowToHigh'
          ? (a, b) => a.averagePrice - b.averagePrice
          : (a, b) => b.averagePrice - a.averagePrice;
      const vendorsByCost = vendorInfos.sort(sortFunction);
      return vendorsByCost;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Something went wrong',
        error
      );
    }
  }

  async FilterVendors(req, res, next) {
    try {
      const {
        city,
        limit,
        page,
        sortBy,
        cuisines,
        minRating,
        minCostPerPerson,
        maxCostPerPerson,
        latitude,
        longitude,
      } = req.query;

      const whereConditionForCuisines = cuisines
        ? [{ model: Category, where: { id: cuisines.split(',') } }]
        : [Category];

      const paginatedVendors = await this.vendorDb.FindAll(
        {
          include: [
            { model: Address, where: { city } },
            { model: Review },
            { model: Order },
            {
              model: MenuItem,
              include: whereConditionForCuisines,
            },
          ],
        },
        limit,
        page
      );
      let vendorsData = [];

      // Sort By section
      if (sortBy === 'nearBy' && !latitude && !longitude) {
        throw new ApiError(404, 'latitude and longitude are required');
      }
      const SortBy = {
        popularity: () => FilterController.ByPopularity(paginatedVendors),
        nearBy: () =>
          FilterController.ByNearByVendors(
            paginatedVendors.vendors,
            latitude,
            longitude
          ),
        rating: () => FilterController.ByRating(paginatedVendors),
        deliveryTime: () => FilterController.ByDeliveryTime(paginatedVendors),
        costLowToHigh: () =>
          FilterController.ByCost(paginatedVendors, 'LowToHigh'),
        costHighToLow: () =>
          FilterController.ByCost(paginatedVendors, 'HighToLow'),
      };

      if (sortBy && SortBy[sortBy]) {
        vendorsData = await SortBy[sortBy]();
      } else {
        vendorsData = await SortBy.popularity();
      }
      // Rating section
      if (minRating) {
        vendorsData =
          sortBy !== 'rating' ? await SortBy.rating(vendorsData) : vendorsData;
        vendorsData = vendorsData.filter(
          (vendor) => vendor.averageRating >= minRating
        );
      }
      // CostPerPerson section
      if (minCostPerPerson && maxCostPerPerson) {
        vendorsData =
          sortBy !== 'costLowToHigh' && sortBy !== 'costHighToLow'
            ? SortBy.costLowToHigh(vendorsData)
            : vendorsData;
        vendorsData = vendorsData.filter(
          (vendor) =>
            vendor.averagePrice >= minCostPerPerson &&
            vendor.averagePrice <= maxCostPerPerson
        );
      }

      const vendors = vendorsData.map((vendor) => {
        const { Orders, MenuItems, Reviews, license, ...others } = vendor;
        const averageRating = !('averageRating' in vendor)
          ? Helper.GetAverageRating(Reviews)
          : vendor.averageRating;
        return { averageRating, ...others };
      });

      return res.status(STATUS_CODES.OK).json(
        new ApiResponse(
          STATUS_CODES.OK,
          {
            pagination: paginatedVendors.pagination,
            vendors,
          },
          'Vendors fetched successfully'
        )
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default FilterController;
