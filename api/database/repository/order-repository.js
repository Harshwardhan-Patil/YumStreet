import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { Order } from '../models/index.js';

class OrderRepository {
  constructor() {
    this.model = Order;
  }

  async CreateOrder({ status, orderDate, totalPrice, userId, vendorId }) {
    try {
      const order = await this.model.create({
        status,
        orderDate,
        totalPrice,
        userId,
        vendorId,
      });
      return order;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to create order');
    }
  }

  async FindOrderById(id, attributes = []) {
    try {
      const order = await this.model.findByPk(id, {
        attributes,
      });
      return order;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to find order');
    }
  }

  async FindOrderByUserId(userId) {
    try {
      const userOrders = await this.model.findAll({ where: { userId } });
      return userOrders;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find user order'
      );
    }
  }

  // TODO: Implement other find methods as you need
  // async FindOrderDetailsWithItems(orderId) {
  //     const order = await Order.findByPk(orderId, {
  //         include: [{ model: Order, as: 'items' }],
  //     });
  //     return order;
  // }

  async UpdateOrder(id, orderDataToUpdate) {
    try {
      const validOrderDataToUpdate =
        await Filter.GetValidAttributes(orderDataToUpdate);
      const order = await this.model.update(validOrderDataToUpdate, {
        where: { id },
      });
      return order;
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to update order');
    }
  }

  async DeleteOrderById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Order deleted successfully';
    } catch (error) {
      throw new ApiError(STATUS_CODES.INTERNAL_ERROR, 'Unable to delete order');
    }
  }
}

export default OrderRepository;
