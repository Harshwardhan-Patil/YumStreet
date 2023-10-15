import { STATUS_CODES } from '../../constants.js';
import {
  VendorRepository,
  MenuItemRepository,
  CategoryRepository,
} from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class VendorMenuItemsController {
  constructor() {
    this.vendorDb = new VendorRepository();
    this.categoryDb = new CategoryRepository();
    this.db = new MenuItemRepository();
  }

  async CreateVendorMenuItem(req, res, next) {
    try {
      const isMenuItemExist = await this.db.FindMenuItemByName(
        req.body.name,
        req.body.vendorId
      );
      if (isMenuItemExist) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'Menu item already exists'
        );
      }
      const category = await this.categoryDb.FindCategoryById(
        req.body.categoryId
      );
      if (!category) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Category not found');
      }
      const vendor = await this.vendorDb.FindVendorById(req.body.vendorId);
      if (!vendor) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Vendor not found');
      }
      const body = { image: { localPath: req.file.path }, ...req.body };
      const menuItem = await this.db.CreateMenuItem(body, vendor, category);

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { ...menuItem.dataValues },
            'Menu Item created successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  // TODO: Find solution to  send the menu item by filtering items by category
  async GetVendorMenuItems(req, res, next) {
    try {
      const menuItems = await this.db.FindMenuItemsByVendorId(
        req.query.vendorId
      );

      if (!menuItems) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'No menu items found');
      }

      const CategoryWiseMenuItems = menuItems.reduce((acc, item) => {
        const { categoryId } = item.dataValues;
        const { Category, ...itemData } = item.dataValues;

        if (!acc[categoryId]) {
          acc[categoryId] = {
            ...Category.dataValues,
            menuItems: [],
          };
        }

        acc[categoryId].menuItems.push(itemData);
        return acc;
      }, {});

      const outputCategories = Object.values(CategoryWiseMenuItems);

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            outputCategories,
            'Menu Items fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateVendorMenuItem(req, res, next) {
    try {
      const body = req.file
        ? { image: { localPath: req.file.path }, ...req.body }
        : req.body;
      const menuItem = await this.db.UpdateMenuItem(req.params.itemId, body);
      console.log(menuItem);
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...menuItem[0].dataValues },
            'Menu Item updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async DeleteVendorMenuItem(req, res, next) {
    try {
      const menuItem = await this.db.DeleteMenuItemById(req.params.itemId);
      console.log(menuItem);
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(STATUS_CODES.OK, {}, 'Menu Item deleted successfully')
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default VendorMenuItemsController;
