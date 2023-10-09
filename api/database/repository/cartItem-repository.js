import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { CartItem } from '../models/index.js';

class CartItemItemRepository {
  constructor() {
    this.model = CartItem;
  }

  async CreateCartItem({ quantity, cartId, menuItemId }) {
    try {
      const cartItem = await this.model.create({
        quantity,
        cartId,
        menuItemId,
      });
      return cartItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create cart item'
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
        'Unable to find cart item'
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
        'Unable to find cart item'
      );
    }
  }

  async UpdateCartItem(id, cartItemDataToUpdate) {
    try {
      const validCartItemDataToUpdate =
        await Filter.GetValidAttributes(cartItemDataToUpdate);
      const cartItem = await this.model.update(validCartItemDataToUpdate, {
        where: { id },
      });
      return cartItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update cart item'
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
        'Unable to delete Cart item'
      );
    }
  }
}

export default CartItemItemRepository;
