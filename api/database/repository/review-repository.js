import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { Address, Review, User, Vendor } from '../models/index.js';

class ReviewRepository {
  constructor() {
    this.model = Review;
  }

  async CreateReview({ rating, comment = '', userId, vendorId, orderId }) {
    try {
      const review = await this.model.create({
        rating,
        comment,
        userId,
        vendorId,
        orderId,
      });
      return review;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create review'
      );
    }
  }

  async FindReviewById(id) {
    try {
      const review = await this.model.findByPk(id);
      return review;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find review');
    }
  }

  async FindReviewsByVendorId(vendorId) {
    try {
      const reviews = await this.model.findAll({
        where: { vendorId },
        include: [{ model: User, attributes: { exclude: 'password' } }],
      });
      return reviews;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find review');
    }
  }

  async FindReviewsByUserId(userId) {
    try {
      const reviews = await this.model.findAll({
        where: { userId },
        include: [
          {
            model: Vendor,
            attributes: { exclude: 'license' },
            include: [Address],
          },
        ],
      });
      return reviews;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find review',
        error
      );
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

  async FindReviewByCondition(condition = {}) {
    try {
      const reviews = await this.model.findOne({ where: condition });
      return reviews;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find review');
    }
  }

  async UpdateReview(id, reviewDataToUpdate) {
    try {
      const validReviewDataToUpdate = await Filter.GetValidAttributes(
        reviewDataToUpdate,
        this.model
      );
      const review = await this.model.update(validReviewDataToUpdate, {
        where: { id },
        returning: true,
      });
      if (review[0] <= 0) {
        throw new ApiError('cart item not found');
      }
      return review[1];
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
