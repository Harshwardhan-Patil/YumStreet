import { STATUS_CODES } from '../../constants.js';
import { ReviewRepository } from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class VendorReviewController {
  constructor() {
    this.reviewDb = new ReviewRepository();
  }

  async FindVendorReviews(req, res, next) {
    try {
      const VendorReviews = await this.reviewDb.FindReviewsByVendorId(
        req.query.vendorId
      );
      if (!VendorReviews) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Vendor Review not found');
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            VendorReviews,
            'Vendor reviews fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async FindVendorReview(req, res, next) {
    try {
      const VendorReview = await this.reviewDb.FindReviewById(
        req.params.reviewId
      );

      if (!VendorReview) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Review not found');
      }

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            VendorReview.dataValues,
            'Vendor Review fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default VendorReviewController;
