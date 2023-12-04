import { Router } from 'express';
import Authenticator from '../../middlewares/Authenticator.js';
import VendorOrderController from '../../controllers/vendor/VendorOrderController.js';
import VendorOrderValidator from '../../validators/vendors/VendorOrderValidator.js';
import validate from '../../validators/validate.js';

const router = Router();
router.use(Authenticator.VerifyVendorToken);
const VendorOrder = new VendorOrderController();
// api/users/:vendorId/orders/*
router
  .route('/')
  .get(
    VendorOrderValidator.GetOrders(),
    validate,
    VendorOrder.GetOrders.bind(VendorOrder)
  );

router
  .route('/:orderId')
  .get(VendorOrder.GetOrder.bind(VendorOrder))
  .put(
    VendorOrderValidator.UpdateOrderVendorStatuses(),
    validate,
    VendorOrder.UpdateOrderVendorStatuses.bind(VendorOrder)
  );

router.put(
  '/:orderId/complete',
  VendorOrder.UpdateOrderComplete.bind(VendorOrder)
);
router.put('/:orderId/cancel', VendorOrder.UpdateOrderCancel.bind(VendorOrder));

export default router;
