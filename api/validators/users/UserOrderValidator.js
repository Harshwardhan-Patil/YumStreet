import { body, checkExact } from 'express-validator';

class UserOrderValidator {
  static CreateOrder() {
    return checkExact([
      body('address')
        .optional()
        .notEmpty()
        .withMessage('Provide menu item id')
        .isObject()
        .withMessage('address must be a object'),
      body('vendorId')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('provide vendor id'),
    ]);
  }

  static VerifyOrder() {
    return checkExact([
      body('razorpay_order_id')
        .trim()
        .notEmpty()
        .withMessage('Provide razorpay_order_id'),
      body('razorpay_payment_id')
        .trim()
        .notEmpty()
        .withMessage('Provide razorpay_payment_id'),
      body('razorpay_signature')
        .trim()
        .notEmpty()
        .withMessage('Provide razorpay_signature'),
    ]);
  }

  static UpdateOrderStatus() {
    return checkExact([
      body('status').trim().notEmpty().withMessage('Provide order status'),
    ]);
  }

  static DeleteOrder() {
    return checkExact([
      body('orderId')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Provide Order id'),
    ]);
  }
}

export default UserOrderValidator;
