import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { MenuItem, Order, OrderItem } from '../models/index.js';

class OrderRepository {
  constructor() {
    this.model = Order;
  }

  async CreateOrder({
    status,
    orderDate,
    totalPrice,
    paymentId,
    userId,
    addressId,
    vendorId,
  }) {
    try {
      const order = await this.model.create({
        status,
        orderDate,
        totalPrice,
        paymentId,
        userId,
        vendorId,
        addressId,
      });
      return order;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create order',
        error
      );
    }
  }

  async FindOrderById(id) {
    try {
      const order = await this.model.findByPk(id, {
        include: [{ model: OrderItem, include: [MenuItem] }],
      });
      return order;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find order',
        error
      );
    }
  }

  async FindOrderByUserId(userId) {
    try {
      const userOrders = await this.model.findAll({
        where: { userId },
        include: [{ model: OrderItem, include: [MenuItem] }],
      });
      return userOrders;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find user order',
        error
      );
    }
  }

  // TODO: Implement other find methods as you need
  async FindOrderDetailsWithItems(orderId) {
    try {
      const order = await this.model.findByPk(orderId, {
        include: OrderItem,
      });
      return order;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find user order',
        error
      );
    }
  }

  async UpdateOrder(id = {}, orderDataToUpdate = {}) {
    try {
      const validOrderDataToUpdate = await Filter.GetValidAttributes(
        orderDataToUpdate,
        this.model
      );
      const order = await this.model.update(validOrderDataToUpdate, {
        where: id,
        returning: true,
      });
      if (order[0] <= 0) {
        throw new ApiError('cart item not found');
      }
      return order[1];
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update order',
        error
      );
    }
  }

  async DeleteOrderById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Order deleted successfully';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete order',
        error
      );
    }
  }
}

export default OrderRepository;
