import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { Cart } from '../models/index.js';

class CartRepository {
  constructor() {
    this.model = Cart;
  }

  async CreateCart({ userId }) {
    try {
      const cart = await this.model.create({
        userId,
      });
      return cart;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to create Cart');
    }
  }

  async FindCartById(id) {
    try {
      const cart = await this.model.findByPk(id);
      return cart;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find Cart');
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
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to update Cart');
    }
  }

  async DeleteCartById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Order deleted successfully';
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to delete Cart');
    }
  }
}

export default CartRepository;
