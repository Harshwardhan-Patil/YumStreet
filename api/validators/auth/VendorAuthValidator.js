import { body } from 'express-validator';

class VendorAuthValidator {
  static Register() {
    return [
      body('name').trim().notEmpty().withMessage('Vendor name is required'),
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
}

export default VendorAuthValidator;
