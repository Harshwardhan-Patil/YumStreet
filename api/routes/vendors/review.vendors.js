import { Router } from 'express';
import Authenticator from '../../middlewares/Authenticator.js';
import VendorReviewValidator from '../../validators/vendors/VendorReviewValidator.js';
import VendorReviewController from '../../controllers/vendor/VendorReviewController.js';
import validate from '../../validators/validate.js';

const router = Router();
const VendorReview = new VendorReviewController();
router.use(Authenticator.VerifyToken);

router
  .route('/')
  .get(
    VendorReviewValidator.FindVendorReviews(),
    validate,
    VendorReview.FindVendorReviews.bind(VendorReview)
  );
router
  .route('/:reviewId')
  .get(VendorReview.FindVendorReview.bind(VendorReview));

export default router;
