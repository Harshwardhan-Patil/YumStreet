import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { Cart, CartItem, MenuItem } from '../models/index.js';

class CartRepository {
  constructor() {
    this.model = Cart;
  }

  async CreateCart(user) {
    try {
      const cart = await this.model.create();
      cart.setUser(user);
      return cart;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create Cart',
        error
      );
    }
  }

  async FindCartById(id) {
    try {
      const cart = await this.model.findByPk(id);
      return cart;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find Cart',
        error
      );
    }
  }

  async FindCartByUserId(userId) {
    try {
      const cart = await this.model.findOne({ where: { userId } });
      return cart;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find Cart',
        error
      );
    }
  }

  async FindCartDetailsByUserId(userId) {
    try {
      const cart = await this.model.findOne({
        where: { userId },
        include: [
          {
            model: CartItem,
            include: [MenuItem],
          },
        ],
      });
      const cartData = {
        id: cart.id,
        cartItems: cart.CartItems.map((cartItem) => {
          return {
            id: cartItem.id,
            quantity: cartItem.quantity,
            menuItem: { ...cartItem.MenuItem.dataValues },
          };
        }),
      };
      return cartData;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find Cart',
        error
      );
    }
  }

  async UpdateCart(id, cartDataToUpdate) {
    try {
      const validCartDataToUpdate =
        await Filter.GetValidAttributes(cartDataToUpdate);
      const cart = await this.model.update(validCartDataToUpdate, {
        where: { id },
      });
      return cart;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update Cart',
        error
      );
    }
  }

  async DeleteCartById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Cart cleared successfully';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete Cart',
        error
      );
    }
  }
}

export default CartRepository;
