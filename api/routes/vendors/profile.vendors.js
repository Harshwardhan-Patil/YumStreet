import { Router } from 'express';
import Authenticator from '../../middlewares/Authenticator.js';
import VendorProfileController from '../../controllers/vendor/VendorProfileController.js';
import upload from '../../middlewares/Multer.js';
import VendorProfileValidator from '../../validators/vendors/VendorProfileValidator.js';
import validate from '../../validators/validate.js';
import { VENDOR_IMAGE_FIELDS } from '../../constants.js';

const router = Router();

const VendorProfile = new VendorProfileController();
// api/vendors/:vendorId/profile*
router
  .route('/:vendorId')
  .get(VendorProfile.GetVendorProfile.bind(VendorProfile))
  .put(
    Authenticator.VerifyVendorToken,
    upload.fields(VENDOR_IMAGE_FIELDS),
    VendorProfileValidator.UpdateProfile(),
    validate,
    VendorProfile.UpdateVendorProfile.bind(VendorProfile)
  );

export default router;
