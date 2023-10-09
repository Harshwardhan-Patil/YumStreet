import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { MenuItem } from '../models/index.js';

class MenuItemRepository {
  constructor() {
    this.model = MenuItem;
  }

  async CreateMenuItem({
    name,
    description = '',
    isVeg,
    price,
    image,
    vendorId,
    categoryId,
  }) {
    try {
      const menuItem = await this.model.create({
        name,
        description,
        isVeg,
        price,
        image,
        vendorId,
        categoryId,
      });
      return menuItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create menu item'
      );
    }
  }

  async FindMenuItemById(id, attributes = []) {
    try {
      const menuItem = await this.model.findByPk(id, {
        attributes,
      });
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
      const menuItems = await this.model.findAll({ where: { vendorId } });
      return menuItems;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find menu item'
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
      const validMenuItemDataToUpdate =
        await Filter.GetValidAttributes(menuItemDataToUpdate);
      const menuItem = await this.model.update(validMenuItemDataToUpdate, {
        where: { id },
      });
      return menuItem;
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
