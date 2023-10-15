import { body } from 'express-validator';

class VendorProfileValidator {
  static UpdateProfile() {
    return [
      body('name').optional().trim().notEmpty().withMessage('name is required'),
      body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('description is required'),
      body('isOpen')
        .optional()
        .notEmpty()
        .withMessage('Email is required')
        .isBoolean()
        .toBoolean()
        .withMessage('Provide a valid isOpen value'),
      body('openingTime')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Vendor opening time is required'),
      body('closingTime')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Vendor closing time is required'),
    ];
  }
}

export default VendorProfileValidator;
