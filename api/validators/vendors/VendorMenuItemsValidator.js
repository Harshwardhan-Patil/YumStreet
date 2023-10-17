import { body, checkExact, query } from 'express-validator';

class VendorMenuItemsValidator {
  static GetMenuItems() {
    return checkExact([
      query('vendorId').trim().notEmpty().withMessage('VendorId is required'),
    ]);
  }

  static CreateMenuItem() {
    return [
      body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .toLowerCase(),
      body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required'),
      body('isVeg')
        .trim()
        .notEmpty()
        .withMessage('isVeg is required')
        .isBoolean()
        .toBoolean()
        .withMessage('Invalid isVeg value'),
      body('price')
        .notEmpty()
        .withMessage('Price is required')
        .toFloat()
        .withMessage('Invalid price value'),
      body('categoryId')
        .trim()
        .notEmpty()
        .withMessage('categoryId is required'),
    ];
  }

  static UpdateMenuItem() {
    return [
      body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .toLowerCase(),
      body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Description is required'),
      body('isVeg')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('isVeg is required')
        .isBoolean()
        .toBoolean()
        .withMessage('Invalid isVeg value'),
      body('price')
        .optional()
        .notEmpty()
        .withMessage('Price is required')
        .toFloat()
        .withMessage('Invalid price value'),
    ];
  }
}

export default VendorMenuItemsValidator;
