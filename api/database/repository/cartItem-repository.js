import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { CartItem } from '../models/index.js';

class CartItemRepository {
  constructor() {
    this.model = CartItem;
  }

  async CreateCartItem(cartItemData, cart, menuItem) {
    try {
      const validCartItemData = Filter.GetValidAttributes(
        cartItemData,
        this.model
      );
      const cartItem = await this.model.create(validCartItemData);
      cartItem.setCart(cart);
      cartItem.setMenuItem(menuItem);
      return cartItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create cart item',
        error
      );
    }
  }

  async FindCartItemById(id) {
    try {
      const cartItem = await this.model.findByPk(id);
      return cartItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find cart item',
        error
      );
    }
  }

  async FindCartItemByCartId(cartId) {
    try {
      const cartItems = await this.model.findAll({ where: { cartId } });
      return cartItems;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find cart item',
        error
      );
    }
  }

  async UpdateCartItem(id, cartItemDataToUpdate) {
    try {
      const validCartItemDataToUpdate =
        await Filter.GetValidAttributes(cartItemDataToUpdate);
      const cartItem = await this.model.update(validCartItemDataToUpdate, {
        where: { id },
        returning: true,
      });
      if (cartItem[0] <= 0) {
        throw new ApiError('cart item not found');
      }
      return cartItem[1];
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update cart item',
        error
      );
    }
  }

  async DeleteCartItemById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Order deleted successfully';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete Cart item',
        error
      );
    }
  }
}

export default CartItemRepository;
