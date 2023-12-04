import { body, checkExact } from 'express-validator';

class UserReviewValidator {
  static CreateReview() {
    return checkExact([
      body('vendorId').trim().notEmpty().withMessage('Provide vendor id'),
      body('orderId').trim().notEmpty().withMessage('Provide order id'),
      body('rating')
        .trim()
        .notEmpty()
        .withMessage('Provide rating')
        .toFloat()
        .custom((value) => {
          if (parseInt(value, 10) < 1 || parseInt(value, 10) > 5) {
            throw new Error(
              'Invalid rating value provided it must be between 1 and 5'
            );
          }
          return true;
        }),
      body('comment').trim().default(''),
    ]);
  }

  static UpdateReview() {
    return [
      body('rating')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Provide rating')
        .toFloat()
        .custom((value) => {
          if (parseFloat(value) < 1 || parseFloat(value) > 5) {
            throw new Error(
              'Invalid rating value provided it must be between 1 and 5'
            );
          }
          return true;
        }),
      body('comment').optional().trim().default(''),
    ];
  }
}

export default UserReviewValidator;
