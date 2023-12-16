import { STATUS_CODES } from '../../constants.js';
import {
  CategoryRepository,
  UserRepository,
  VendorRepository,
} from '../../database/index.js';
import ApiResponse from '../../utils/ApiResponse.js';
import Helper from '../../utils/Helper.js';
import { Address, Review } from '../../database/models/index.js';

class SearchController {
  constructor() {
    this.vendorDb = new VendorRepository();
    this.userDb = new UserRepository();
    this.categoryDb = new CategoryRepository();
  }

  async SearchVendorAndCategories(req, res, next) {
    try {
      const { query, city } = req.query;
      const condition = city
        ? {
            include: [{ model: Address, where: { city } }, { model: Review }],
          }
        : { model: Review };
      const vendors = await this.vendorDb.FindVendorByLike(query, condition);
      const vendorsData = vendors.map((vendor) => {
        const { Reviews, license, ...vendorData } = vendor.dataValues;
        const averageRating = Helper.GetAverageRating(Reviews);
        return { ...vendorData, averageRating };
      });
      const categories = await this.categoryDb.FindCategoryByRegEX(query);
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { vendor: vendorsData, category: categories },
            'Vendors fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default SearchController;
