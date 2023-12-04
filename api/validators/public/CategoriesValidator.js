import { body, query } from 'express-validator';

class CategoriesValidator {
  static SearchCategories() {
    return [query('query').trim().notEmpty().withMessage('Query is required')];
  }

  static CreateCategoryInBulk() {
    return [
      body('data')
        .isArray()
        .toArray()
        .withMessage('data field must be array')
        .notEmpty()
        .withMessage('Data is required'),
      body('data.*.name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .toLowerCase()
        .withMessage('Provide a lowercase name'),
      body('data.*.description')
        .trim()
        .notEmpty()
        .withMessage('Description is required'),
    ];
  }

  static CreateCategory() {
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
    ];
  }

  static UpdateCategory() {
    return [
      body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLowercase()
        .toLowerCase(),
      body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Description is required'),
    ];
  }
}

export default CategoriesValidator;
