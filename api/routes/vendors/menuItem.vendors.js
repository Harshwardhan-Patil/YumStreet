import { Router } from 'express';
import VendorMenuItemsController from '../../controllers/vendor/VendorMenuItemsController.js';
import Authenticator from '../../middlewares/Authenticator.js';
import VendorMenuItemsValidator from '../../validators/vendors/VendorMenuItemsValidator.js';
import validate from '../../validators/validate.js';
import upload from '../../middlewares/Multer.js';

const router = Router();
const VendorMenuItems = new VendorMenuItemsController();
// api/vendors/menu/*
// Get a all menu items of a vendor by categories (publicly accessible)
router
  .route('/')
  .get(
    VendorMenuItemsValidator.GetMenuItems(),
    validate,
    VendorMenuItems.GetVendorMenuItems.bind(VendorMenuItems)
  );

// To add a new menu item to vendor
router
  .use(Authenticator.VerifyToken)
  .route('/items')
  .post(
    upload.single('image'),
    VendorMenuItemsValidator.CreateMenuItem(),
    validate,
    VendorMenuItems.CreateVendorMenuItem.bind(VendorMenuItems)
  );

// Todo: implement search controller
router.get('/items/search');

router
  .use(Authenticator.VerifyToken)
  .route('/items/:itemId')
  .put(
    upload.single('image'),
    VendorMenuItemsValidator.UpdateMenuItem(),
    validate,
    VendorMenuItems.UpdateVendorMenuItem.bind(VendorMenuItems)
  )
  .delete(VendorMenuItems.DeleteVendorMenuItem.bind(VendorMenuItems));

export default router;
