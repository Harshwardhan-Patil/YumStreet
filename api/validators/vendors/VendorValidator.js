import { query, checkExact } from 'express-validator';

class VendorValidator {
  static GetVendorBySearch() {
    return checkExact([
      query('query').trim().notEmpty().withMessage('Provide query value'),
      query('city').trim(),
    ]);
  }
}

export default VendorValidator;
