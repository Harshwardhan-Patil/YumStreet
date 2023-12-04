import { OrderStatusEnum, STATUS_CODES } from '../../constants.js';
import { OrderRepository, VendorRepository } from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class VendorOrderController {
  constructor() {
    this.vendorDb = new VendorRepository();
    this.orderDb = new OrderRepository();
  }

  async GetOrders(req, res, next) {
    try {
      const { page = 1, limit = 25, status = '', vendorId } = req.query;
      let vendorOrders;
      if (status) {
        vendorOrders = await this.orderDb.FindOrderByVendorIdWithStatus(
          vendorId,
          status,
          page,
          limit
        );
      } else {
        vendorOrders = await this.orderDb.FindOrderByVendorId(
          vendorId,
          page,
          limit
        );
      }

      if (!vendorOrders) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Vendor Order Not Found');
      }
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            vendorOrders,
            'Vendor orders fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async GetOrder(req, res, next) {
    try {
      const vendor = await this.orderDb.DeleteOrderById(req.params.orderId);

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            vendor,
            'Vendor order fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateOrderVendorStatuses(req, res, next) {
    try {
      let vendor = await this.orderDb.FindOrderById(req.params.orderId);
      const { status } = req.body;
      if (!vendor) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Order not found');
      }
      if (
        OrderStatusEnum.CANCELLED === vendor.dataValues.status ||
        OrderStatusEnum.DELIVERED === vendor.dataValues.status
      ) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'The order status cannot be updated once it has been canceled or delivered'
        );
      }

      if (
        status === OrderStatusEnum.CANCELLED ||
        status === OrderStatusEnum.DELIVERED
      ) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'The order status cannot be updated to canceled or delivered'
        );
      }
      vendor = await this.orderDb.UpdateOrder(
        { id: req.params.orderId },
        { status }
      );

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            vendor,
            'Vendor order fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateOrderComplete(req, res, next) {
    try {
      let vendor = await this.orderDb.FindOrderById(req.params.orderId);
      if (!vendor) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Order not found');
      }
      if (
        OrderStatusEnum.CANCELLED === vendor.dataValues.status ||
        OrderStatusEnum.DELIVERED === vendor.dataValues.status
      ) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'The order status cannot be updated once it has been canceled or delivered'
        );
      }
      vendor = await this.orderDb.UpdateOrder(
        { id: req.params.orderId },
        {
          status: OrderStatusEnum.DELIVERED,
          completedAt: new Date(),
        }
      );

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            vendor,
            'Vendor order fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateOrderCancel(req, res, next) {
    try {
      let vendor = await this.orderDb.FindOrderById(req.params.orderId);
      if (!vendor) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Order not found');
      }
      if (
        OrderStatusEnum.CANCELLED === vendor.dataValues.status ||
        OrderStatusEnum.DELIVERED === vendor.dataValues.status
      ) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'The order status cannot be updated once it has been canceled or delivered'
        );
      }
      vendor = await this.orderDb.UpdateOrder(
        { id: req.params.orderId },
        {
          status: OrderStatusEnum.CANCELLED,
          cancelledAt: new Date(),
        }
      );

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            vendor,
            'Vendor order fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

export default VendorOrderController;
