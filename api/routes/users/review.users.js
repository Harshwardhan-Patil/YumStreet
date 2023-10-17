import { Router } from 'express';
import UserReviewController from '../../controllers/user/UserReviewController.js';
import Authenticator from '../../middlewares/Authenticator.js';
import UserReviewValidator from '../../validators/users/UserReviewValidator.js';
import validate from '../../validators/validate.js';

const router = Router();
const UserReview = new UserReviewController();
// api/users/:userId/reviews/*
router
  .route('/')
  .get(UserReview.GetUserReviews.bind(UserReview))
  .post(
    Authenticator.VerifyToken,
    UserReviewValidator.CreateReview(),
    validate,
    UserReview.CreateUserReview.bind(UserReview)
  );
router
  .use(Authenticator.VerifyToken)
  .route('/:reviewId')
  .get(UserReview.GetUserReview.bind(UserReview))
  .put(
    UserReviewValidator.UpdateReview(),
    validate,
    UserReview.UpdateUserReview.bind(UserReview)
  )
  .delete(UserReview.DeleteUserReview.bind(UserReview));

export default router;
