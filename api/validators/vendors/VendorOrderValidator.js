import { body, query } from 'express-validator';

class VendorOrderValidator {
  static GetOrders() {
    return [
      query('vendorId').trim().notEmpty().withMessage('Provide vendorId value'),
    ];
  }

  static UpdateOrderVendorStatuses() {
    return [
      body('status')
        .trim()
        .notEmpty()
        .withMessage('Vendor Status should not be empty'),
    ];
  }
}

export default VendorOrderValidator;
