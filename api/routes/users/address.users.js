import { Router } from 'express';
import UserAddressController from '../../controllers/user/UserAddressController.js';
import Authenticator from '../../middlewares/Authenticator.js';
import validate from '../../validators/validate.js';
import AddressValidator from '../../validators/public/AddressValidator.js';

const router = Router();
router.use(Authenticator.VerifyToken);
const UserAddress = new UserAddressController();

router
  .route('/')
  .get(UserAddress.GetUserAddress.bind(UserAddress))
  .post(
    AddressValidator.CreateAddress(),
    validate,
    UserAddress.CreateUserAddress.bind(UserAddress)
  );

router.route('/all').get(UserAddress.GetAllUserAddress.bind(UserAddress));

router
  .route('/:addressId')
  .put(
    AddressValidator.UpdateAddress(),
    validate,
    UserAddress.UpdateUserAddress.bind(UserAddress)
  )
  .delete(UserAddress.DeleteUserAddress.bind(UserAddress));

export default router;
