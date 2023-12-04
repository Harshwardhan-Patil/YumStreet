import { Router } from 'express';
import UserOrderController from '../../controllers/user/UserOrderController.js';
import Authenticator from '../../middlewares/Authenticator.js';
import UserOrderValidator from '../../validators/users/UserOrderValidator.js';
import validate from '../../validators/validate.js';

const router = Router();
router.use(Authenticator.VerifyToken);
const UserOrder = new UserOrderController();
// Get all user orders | create new user order
router
  .route('/')
  .get(UserOrder.FindUserOrders.bind(UserOrder))
  .post(
    UserOrderValidator.CreateOrder(),
    validate,
    UserOrder.CreateUserOrder.bind(UserOrder)
  );

router
  .route('/verify')
  .post(
    UserOrderValidator.VerifyOrder(),
    validate,
    UserOrder.VerifyOrder.bind(UserOrder)
  );

// Get specific user order | update user order like (isPaymentDone,changing status)
router.get('/:orderId', UserOrder.FindUserOrder.bind(UserOrder));

router.put(
  '/:orderId/status',
  UserOrderValidator.UpdateOrderStatus(),
  validate,
  UserOrder.UpdateUserOrderStatus.bind(UserOrder)
);

// Todo: don't delete it change status to canceled
router.delete(
  '/:orderId/cancel',
  UserOrderValidator.DeleteOrder(),
  validate,
  UserOrder.DeleteUserOrder.bind(UserOrder)
);

export default router;
