import { Router } from 'express';
import VendorAddressController from '../../controllers/vendor/VendorAddressController.js';
import AddressValidator from '../../validators/public/AddressValidator.js';
import validate from '../../validators/validate.js';
import Authenticator from '../../middlewares/Authenticator.js';

const router = Router();
const VendorAddress = new VendorAddressController();
router
  .route('/:addressId')
  .get(VendorAddress.GetVendorAddress.bind(VendorAddress))
  .put(
    Authenticator.VerifyVendorToken,
    AddressValidator.UpdateAddress(),
    validate,
    VendorAddress.UpdateVendorAddress.bind(VendorAddress)
  );

export default router;
