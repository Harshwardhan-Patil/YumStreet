/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import {
  EventEnum,
  OrderStatusEnum,
  OrderTypesEnum,
  STATUS_CODES,
} from '../../constants.js';
import {
  UserRepository,
  OrderRepository,
  OrderItemRepository,
  AddressRepository,
  CartRepository,
  CartItemRepository,
} from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '../../config/index.js';
import Io from '../../sockets/index.js';

class UserOrderController {
  constructor() {
    this.userDb = new UserRepository();
    this.orderDb = new OrderRepository();
    this.orderItemDb = new OrderItemRepository();
    this.addressDb = new AddressRepository();
    this.cart = new CartRepository();
    this.cartItem = new CartItemRepository();
    try {
      this.razorpay = new Razorpay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET,
      });
    } catch (error) {
      console.error(`Razorpay Error: ${error}`);
    }
  }

  async FindUserOrders(req, res, next) {
    try {
      const { page = 1, limit = 25 } = req.query;
      const orders = await this.orderDb.FindOrderByUserId(
        req.user.id,
        page,
        limit
      );

      if (!orders) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'user order not found');
      }
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            orders,
            'User Order fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async FindUserOrder(req, res, next) {
    try {
      const order = await this.orderDb.FindOrderById(req.params.orderId);

      if (!order) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'user order not found');
      }
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...order.dataValues },
            'User Order fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async CreateUserOrder(req, res, next) {
    try {
      if (!req.body.addressId) {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Address does not exist');
      }

      // Calculate total price from the user's cart items
      const cart = await this.cart.FindCartDetailsByUserId(req.user.id);
      if (!cart) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User Cart is Empty');
      }
      const totalPrice = cart.cartItems.reduce((acc, item) => {
        return (
          acc + parseFloat(item.menuItem.price) * parseInt(item.quantity, 10)
        );
      }, 0);

      // Prepare order items for the new order
      const cartItems = cart.cartItems.map((item) => {
        return {
          menuItemId: item.menuItem.id,
          price: parseFloat(item.menuItem.price),
          quantity: parseInt(item.quantity, 10),
        };
      });

      // Create a Razorpay order for payment
      const orderOptions = {
        amount: parseInt(totalPrice * 100, 10), // in paisa
        currency: 'INR',
        receipt: uuidv4(),
      };
      const razorpayOrder = await this.razorpay.orders.create(orderOptions);

      // Create an unpaid order in the database
      const unPaidOrder = await this.orderDb.CreateOrder({
        status: OrderStatusEnum.PENDING,
        orderType: OrderTypesEnum.YUMSTREET_DELIVERY,
        orderDate: Date.now(),
        totalPrice,
        paymentId: razorpayOrder.id,
        userId: req.user.id,
        vendorId: req.body.vendorId || cart.cartItems[0].menuItem.vendorId,
        addressId: req.body.addressId,
      });

      // Create order items and associate them with the order
      const orderItems = await Promise.all(
        cartItems.map((item) =>
          this.orderItemDb.CreateOrderItem({
            orderId: unPaidOrder.dataValues.id,
            ...item,
          })
        )
      );

      // If the order and order items are created successfully, send Razorpay order details
      if (unPaidOrder && orderItems) {
        return res
          .status(201)
          .json(
            new ApiResponse(
              201,
              razorpayOrder,
              'User Razorpay Order created successfully'
            )
          );
      }

      return res
        .status(STATUS_CODES.INTERNAL_ERROR)
        .json(
          new ApiResponse(
            STATUS_CODES.INTERNAL_ERROR,
            null,
            'Something went wrong while initializing the razorpay order'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async VerifyOrder(req, res, next) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature === razorpay_signature) {
        const order = await this.orderDb.UpdateOrder(
          { paymentId: razorpay_order_id },
          { isPaymentDone: true }
        );

        if (!order) {
          throw new ApiError(STATUS_CODES.NOT_FOUND, 'Order not found');
        }
        const cart = await this.cart.FindCartByUserId(req.user.id);
        await this.cart.DeleteCartById(cart.dataValues.id);

        Io.emitSocketEvent({
          req,
          roomId: req.user.id,
          event: EventEnum.ORDER_PLACED_EVENT,
          payload: order,
        });

        return res
          .status(200)
          .json(new ApiResponse(200, order, 'Order placed successfully'));
      }
      throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Invalid signature');
    } catch (error) {
      return next(error);
    }
  }

  async UpdateUserOrderStatus(req, res, next) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      let order = await this.orderDb.FindOrderById(orderId);
      if (!order) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Order not found');
      }

      if (order.dataValues.status === OrderStatusEnum.DELIVERED) {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Order already delivered');
      }
      order = await this.orderDb.UpdateOrder({ id: orderId }, { status });
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            order,
            'User Order updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async DeleteUserOrder(req, res, next) {
    try {
      const order = await this.orderDb.DeleteOrderById(
        req.body.orderId || req.params.orderId
      );
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { order },
            'User Order updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async DeleteUserOrderItem(req, res, next) {
    try {
      const order = await this.orderItemDb.DeleteOrderItemById(
        req.body.orderId
      );
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...order },
            'User Order updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default UserOrderController;
