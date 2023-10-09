import { body } from 'express-validator';
import { AvailableUserRoles } from '../../constants.js';

class UserAuthValidator {
  static Register() {
    return [
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
      body('role')
        .optional()
        .isIn(AvailableUserRoles)
        .withMessage('Invalid user role specified'),
    ];
  }

  static Login() {
    return [
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
    ];
  }
}

export default UserAuthValidator;
