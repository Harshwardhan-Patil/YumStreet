import { body } from 'express-validator';

class UserProfileValidator {
  static UpdateProfile() {
    return [
      body('firstName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Firstname is required'),
      body('lastName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Lastname is required'),
      body('email')
        .optional()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
      body('phoneNumber')
        .optional()
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone()
        .withMessage('Please enter a valid phone number'),
    ];
  }
}

export default UserProfileValidator;
