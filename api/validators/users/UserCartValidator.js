import { body } from 'express-validator';

class UserCartValidator {
  static CreateCart() {
    return [
      body('menuItemId').trim().notEmpty().withMessage('Provide menu item id'),
      body('quantity')
        .trim()
        .notEmpty()
        .withMessage('provide quantity')
        .toInt(),
    ];
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
    return [
      body('cartId')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Provide cart id'),
    ];
  }
}

export default UserCartValidator;
