import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { MenuItem } from '../models/index.js';

class MenuItemRepository {
  constructor() {
    this.model = MenuItem;
  }

  async CreateMenuItem(menuData, vendor, category) {
    try {
      const validVendorData = await Filter.GetValidAttributes(
        menuData,
        this.model
      );
      const menuItem = await this.model.create(validVendorData);
      await menuItem.setVendor(vendor);
      await menuItem.setCategory(category);
      return menuItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create vendor',
        error
      );
    }
  }

  async FindMenuItemById(id) {
    try {
      const menuItem = await this.model.findByPk(id);
      return menuItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find menu item'
      );
    }
  }

  async FindMenuItemByName(name, vendorId) {
    try {
      const menuItem = await this.model.findOne({ where: { name, vendorId } });
      return menuItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find menu item'
      );
    }
  }

  async FindMenuItemsByVendorId(vendorId) {
    try {
      const menuItems = await this.model.findAll({
        where: { vendorId },
        order: [['Category', 'name']],
        include: ['Category'],
      });
      return menuItems;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find menu item',
        error
      );
    }
  }

  async FindMenuItemsByCategoryId(categoryId) {
    try {
      const menuItems = await this.model.findAll({ where: { categoryId } });
      return menuItems;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find menu item'
      );
    }
  }

  async UpdateMenuItem(id, menuItemDataToUpdate) {
    try {
      const validMenuItemDataToUpdate = await Filter.GetValidAttributes(
        menuItemDataToUpdate,
        this.model
      );
      const menuItem = await this.model.update(validMenuItemDataToUpdate, {
        where: { id },
        returning: true,
      });
      if (menuItem[0] <= 0) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Menu item not found');
      }
      return menuItem[1];
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update menu item'
      );
    }
  }

  async DeleteMenuItemById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Order deleted successfully';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete menu item'
      );
    }
  }
}

export default MenuItemRepository;
