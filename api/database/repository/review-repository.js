import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { Review } from '../models/index.js';

class ReviewRepository {
  constructor() {
    this.model = Review;
  }

  async CreateReview({ rating, comment = '', userId, vendorId, menuItemId }) {
    try {
      const review = await this.model.create({
        rating,
        comment,
        userId,
        vendorId,
        menuItemId,
      });
      return review;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create review'
      );
    }
  }

  async FindReviewById(id, attributes = []) {
    try {
      const review = await this.model.findByPk(id, {
        attributes,
      });
      return review;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find review');
    }
  }

  async FindReviewsByVendorId(vendorId) {
    try {
      const reviews = await this.model.findAll({ where: { vendorId } });
      return reviews;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find review');
    }
  }

  async FindReviewsByUserId(userId) {
    try {
      const reviews = await this.model.findAll({ where: { userId } });
      return reviews;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find review');
    }
  }

  async FindReviewsByMenuItemId(menuItemId) {
    try {
      const reviews = await this.model.findAll({ where: { menuItemId } });
      return reviews;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find review');
    }
  }

  async UpdateReview(id, reviewDataToUpdate) {
    try {
      const validReviewDataToUpdate =
        await Filter.GetValidAttributes(reviewDataToUpdate);
      const review = await this.model.update(validReviewDataToUpdate, {
        where: { id },
      });
      return review;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update review'
      );
    }
  }

  async DeleteReviewById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Order deleted successfully';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete review'
      );
    }
  }
}

export default ReviewRepository;
