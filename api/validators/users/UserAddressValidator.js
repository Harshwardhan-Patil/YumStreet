import { body } from 'express-validator';

class UserAddressValidator {
  static CreateAddress() {
    return [
      body('address').trim().notEmpty().withMessage('Address is required'),
      body('country').trim().notEmpty().withMessage('country is required'),
      body('city').trim().notEmpty().withMessage('city is required'),
      body('pincode')
        .trim()
        .notEmpty()
        .withMessage('pincode is required')
        .isLength({ min: 6, max: 6 }),
      body('longitude')
        .trim()
        .notEmpty()
        .withMessage('longitude is required')
        .custom((value) => {
          if (value < -180 || value > 180) {
            throw new Error(
              'Invalid longitude value. Must be between -180 and 180.'
            );
          }
          return true;
        })
        .isFloat()
        .toFloat(),
      body('latitude')
        .trim()
        .notEmpty()
        .withMessage('latitude is required')
        .custom((value) => {
          if (value < -90 || value > 90) {
            throw new Error(
              'Invalid latitude value. Must be between -90 and 90.'
            );
          }
          return true;
        })
        .isFloat()
        .toFloat(),
    ];
  }

  static UpdateAddress() {
    return [
      body('address')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Address is required'),
      body('country')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('country is required'),
      body('city')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('country is required'),
      body('pincode')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('country is required')
        .isLength({ min: 6, max: 6 }),
      body('longitude')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('longitude is required')
        .custom((value) => {
          if (value < -180 || value > 180) {
            throw new Error(
              'Invalid longitude value. Must be between -180 and 180.'
            );
          }
          return true;
        })
        .isFloat()
        .toFloat(),
      body('latitude')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('latitude is required')
        .custom((value) => {
          if (value < -90 || value > 90) {
            throw new Error(
              'Invalid latitude value. Must be between -90 and 90.'
            );
          }
          return true;
        })
        .isFloat()
        .toFloat(),
    ];
  }
}

export default UserAddressValidator;
