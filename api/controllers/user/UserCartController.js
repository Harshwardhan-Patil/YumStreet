import { STATUS_CODES } from '../../constants.js';
import {
  UserRepository,
  CartRepository,
  CartItemRepository,
  MenuItemRepository,
} from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class UserCartController {
  constructor() {
    this.userDb = new UserRepository();
    this.cart = new CartRepository();
    this.cartItem = new CartItemRepository();
    this.menuItem = new MenuItemRepository();
  }

  async GetUserCart(req, res, next) {
    try {
      let cart;
      if (!req.query.cartId) {
        cart = await this.cart.FindCartByUserId(req.user.id);
      }
      if (!cart) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User cart not found');
      }
      const cartItems = await this.cartItem.FindCartItemByCartId(
        req.query.cartId || cart.dataValues.id
      );

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            [...cartItems],
            'User cart fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async CreateUserCart(req, res, next) {
    try {
      const isCartItemExist = await this.cartItem.FindCartItemByMenuItemId(
        req.body.menuItemId
      );
      if (isCartItemExist) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'Cart item is already in the cart'
        );
      }
      const menuItem = await this.menuItem.FindMenuItemById(
        req.body.menuItemId
      );

      if (!menuItem) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Menu item not found');
      }

      const user = await this.userDb.FindUserById(req.user.id);
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
      }

      let cart;
      cart = await this.cart.FindCartByUserId(req.user.id);
      console.log(cart);
      if (!cart) {
        cart = await this.cart.CreateCart(user);
      }
      console.log(cart);
      const body = { ...req.body, cartId: cart.dataValues.id };
      const cartItem = await this.cartItem.CreateCartItem(body, cart, menuItem);
      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...cartItem.dataValues },
            'User cart created successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  // update quantity only
  async UpdateUserCart(req, res, next) {
    try {
      const cart = await this.cartItem.UpdateCartItem(req.params.itemId, {
        quantity: req.body.quantity,
      });

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { ...cart },
            'User cart updated successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async DeleteUserCartItem(req, res, next) {
    try {
      const cartItem = await this.cartItem.DeleteCartItemById(
        req.params.itemId
      );

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            { cartItem },
            'User cart item deleted'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async ClearUserCart(req, res, next) {
    try {
      const cart = await this.cart.DeleteCartById(req.body.cartId);

      return res
        .status(STATUS_CODES.OK)
        .json(new ApiResponse(STATUS_CODES.OK, { cart }, 'User cart cleared'));
    } catch (error) {
      return next(error);
    }
  }
}

export default UserCartController;
