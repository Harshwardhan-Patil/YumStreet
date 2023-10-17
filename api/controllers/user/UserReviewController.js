import { STATUS_CODES } from '../../constants.js';
import { OrderRepository, ReviewRepository } from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class UserReviewController {
  constructor() {
    this.reviewDb = new ReviewRepository();
    this.orderDb = new OrderRepository();
  }

  async GetUserReviews(req, res, next) {
    try {
      const userReviews = await this.reviewDb.FindReviewsByUserId(
        req.query.userId
      );
      if (!userReviews) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User Review not found');
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            userReviews,
            'User reviews fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async GetUserReview(req, res, next) {
    try {
      const userReview = await this.reviewDb.FindReviewById(
        req.params.reviewId
      );

      if (!userReview) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Review not found');
      }

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            userReview.dataValues,
            'User Review fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async CreateUserReview(req, res, next) {
    try {
      const order = await this.orderDb.FindOrderById(req.body.orderId);

      if (!order) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'user order not found');
      }
      const isReviewExist = await this.reviewDb.FindReviewByCondition({
        userId: req.user.id,
        vendorId: req.body.vendorId,
      });
      console.log(isReviewExist);
      if (isReviewExist) {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Review already exists');
      }

      const review = await this.reviewDb.CreateReview({
        rating: req.body.rating,
        comment: req.body.comment || '',
        userId: req.user.id,
        vendorId: req.body.vendorId,
        menuItemId: req.body.menuItemId,
      });

      if (!review) {
        throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Something went wrong');
      }

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            review,
            'User Review created successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateUserReview(req, res, next) {
    try {
      let review = await this.reviewDb.FindReviewById(req.params.reviewId);

      if (!review) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Review not found');
      }

      review = await this.reviewDb.UpdateReview(req.params.reviewId, req.body);

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            review,
            'User Review updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async DeleteUserReview(req, res, next) {
    try {
      const review = await this.reviewDb.DeleteReviewById(req.params.reviewId);
      return res
        .status(200)
        .json(new ApiResponse(STATUS_CODES.OK, review, 'User Review deleted'));
    } catch (error) {
      return next(error);
    }
  }
}

export default UserReviewController;
