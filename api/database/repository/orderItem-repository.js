import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { OrderItem } from '../models/index.js';

class OrderItemRepository {
  constructor() {
    this.model = OrderItem;
  }

  async CreateOrderItem({ price, quantity, orderId, menuItemId }) {
    try {
      const orderItem = await this.model.create({
        price,
        quantity,
        orderId,
        menuItemId,
      });
      return orderItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create order item',
        error
      );
    }
  }

  async FindOrderItemById(id, attributes = []) {
    try {
      const orderItem = await this.model.findByPk(id, {
        attributes,
      });
      return orderItem;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find order item'
      );
    }
  }

  async FindOrderItemsByOrderId(orderId) {
    try {
      const orderItems = await this.model.findAll({ where: { orderId } });
      return orderItems;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find order item'
      );
    }
  }

  async UpdateOrderItem(id, orderItemDataToUpdate) {
    try {
      const validOrderItemDataToUpdate = await Filter.GetValidAttributes(
        orderItemDataToUpdate,
        this.model
      );
      const orderItem = await this.model.update(validOrderItemDataToUpdate, {
        where: { id },
        returning: true,
      });
      if (orderItem[0] <= 0) {
        throw new ApiError('cart item not found');
      }
      return orderItem[1];
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update order item'
      );
    }
  }

  async DeleteOrderItemById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Order deleted successfully';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete order item'
      );
    }
  }
}

export default OrderItemRepository;
