import { body, checkExact } from 'express-validator';

class UserCartValidator {
  static CreateCart() {
    return checkExact([
      body('vendorId').trim().notEmpty().withMessage('Provide vendor id'),
      body('menuItemId').trim().notEmpty().withMessage('Provide menu item id'),
      body('quantity')
        .trim()
        .notEmpty()
        .withMessage('provide quantity')
        .toInt(),
    ]);
  }

  static UpdateCartItem() {
    return [
      body('menuItemId')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Provide menu item id'),
      body('quantity')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('provide quantity')
        .toInt(),
    ];
  }

  static ClearUserCart() {
    return checkExact([
      body('cartId')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Provide cart id'),
    ]);
  }
}

export default UserCartValidator;
