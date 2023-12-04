import { Router } from 'express';
import VendorController from '../../controllers/vendor/VendorController.js';
import VendorValidator from '../../validators/vendors/VendorValidator.js';
import validate from '../../validators/validate.js';

const router = Router();
const Vendor = new VendorController();
/**
 GET /api/vendors/nearby: Get a list of nearby vendors based on user's location.
 GET /api/vendors/trending: Get a list of trending vendors.
 */
router.get(
  '/search',
  VendorValidator.GetVendorBySearch(),
  validate,
  Vendor.SearchVendor.bind(Vendor)
);

router.get('/nearby', Vendor.GetNearByVendors.bind(Vendor));
router.get('/:city/trending', Vendor.GetTrendingVendorsOfCity.bind(Vendor));

export default router;
