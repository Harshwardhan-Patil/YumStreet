import { body, checkExact } from 'express-validator';

class VendorAuthValidator {
  static Register() {
    return [
      body('name')
        .trim()
        .notEmpty()
        .withMessage('Vendor name is required')
        .toLowerCase(),
      body('description')
        .trim()
        .notEmpty()
        .withMessage('Vendor description is required'),
      body('isOpen').optional().isBoolean().toBoolean(),
      body('openingTime')
        .trim()
        .notEmpty()
        .withMessage('Vendor opening time is required'),
      body('closingTime')
        .trim()
        .notEmpty()
        .withMessage('Vendor closing time is required'),
    ];
  }

  static Login() {
    return checkExact([
      body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
      body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8, max: 20 })
        .withMessage('Password length must be between 8 and 20 characters'),
    ]);
  }
}

export default VendorAuthValidator;
