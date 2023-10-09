import { Router } from 'express';
import UserAddressController from '../../controllers/user/UserAddressController.js';
import Authenticator from '../../middlewares/Authenticator.js';
import UserAddressValidator from '../../validators/users/UserAddressValidator.js';
import validate from '../../validators/validate.js';

const router = Router();
router.use(Authenticator.VerifyToken);
const UserAddress = new UserAddressController();

router
  .route('/')
  .post(
    UserAddressValidator.CreateAddress(),
    validate,
    UserAddress.CreateUserAddress.bind(UserAddress)
  );

router
  .route('/:addressId')
  .get(UserAddress.GetUserAddress.bind(UserAddress))
  .put(
    UserAddressValidator.UpdateAddress(),
    validate,
    UserAddress.UpdateUserAddress.bind(UserAddress)
  );

export default router;
