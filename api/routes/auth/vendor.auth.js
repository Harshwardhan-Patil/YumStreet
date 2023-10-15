import { Router } from 'express';
import AddressValidator from '../../validators/public/AddressValidator.js';
import VendorAuthValidator from '../../validators/auth/VendorAuthValidator.js';
import validate from '../../validators/validate.js';
import VendorAuthController from '../../controllers/auth/VendorAuthController.js';
import Authenticator from '../../middlewares/Authenticator.js';
import upload from '../../middlewares/Multer.js';
import { VENDOR_IMAGE_FIELDS } from '../../constants.js';

const router = Router();

const Validators = [
  AddressValidator.CreateAddress(),
  VendorAuthValidator.Register(),
];
const VendorAuth = new VendorAuthController();

router.post(
  '/register',
  Authenticator.VerifyToken,
  upload.fields(VENDOR_IMAGE_FIELDS),
  Validators,
  validate,
  VendorAuth.Register.bind(VendorAuth)
);

export default router;
