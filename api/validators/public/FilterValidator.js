import { query } from 'express-validator';

class FilterValidator {
  static Filter() {
    return [query('city').trim().notEmpty().withMessage('City is required')];
  }
}

export default FilterValidator;
