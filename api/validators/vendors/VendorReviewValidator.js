import { checkExact, query } from 'express-validator';

class VendorReviewValidator {
  static FindVendorReviews() {
    return checkExact([
      query('vendorId').trim().notEmpty().withMessage('Provide vendor id'),
    ]);
  }
}

export default VendorReviewValidator;
