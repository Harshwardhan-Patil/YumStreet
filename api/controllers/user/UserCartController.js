import { STATUS_CODES } from '../../constants.js';
import {
  UserRepository,
  CartRepository,
  CartItemRepository,
  MenuItemRepository,
  VendorRepository,
} from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class UserCartController {
  constructor() {
    this.userDb = new UserRepository();
    this.cartDb = new CartRepository();
    this.cartItemDb = new CartItemRepository();
    this.menuItemDb = new MenuItemRepository();
    this.vendorDb = new VendorRepository();
  }

  async GetUserCart(req, res, next) {
    try {
      const isOptions = Boolean(req.query.isOptions);
      const cart = await this.cartDb.FindCartByUserId(req.user.id);

      if (!cart) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User cart not found');
      }

      let cartItems;
      if (isOptions) {
        cartItems = await this.cartItemDb.FindCartItemsByCartIdWithInclude(
          cart.dataValues.id
        );
      } else {
        cartItems = await this.cartItemDb.FindCartItemByCartId(
          cart.dataValues.id
        );
      }

      return res
        .status(STATUS_CODES.OK)
        .json(
          new ApiResponse(
            STATUS_CODES.OK,
            cartItems,
            'User cart fetched successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  // TODO: If cart is empty and user tries to add another vendors menu item in cart
  // TODO: then clear/delete the cart and create new cart with new vendors item
  async CreateUserCart(req, res, next) {
    try {
      const { menuItemId } = req.body;
      const { vendorId } = req.body;
      const userId = req.user.id;

      const existingCartItem =
        await this.cartItemDb.FindCartItemByMenuItemId(menuItemId);
      if (existingCartItem) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'Item is already in the cart'
        );
      }

      const menuItem = await this.menuItemDb.FindMenuItemById(menuItemId);
      if (!menuItem) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Menu item not found');
      }

      const user = await this.userDb.FindUserById(userId);
      if (!user) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
      }

      let cart = await this.cartDb.FindCartByUserId(userId);
      let vendor;

      if (cart) {
        vendor = await cart.getVendor();
        if (!vendor) {
          throw new ApiError(STATUS_CODES.NOT_FOUND, 'Vendor not found');
        }

        const cartItems = await cart.getCartItems();
        if (cartItems.length === 0 && vendor.dataValues.id !== vendorId) {
          await this.cartDb.DeleteCartById(cart.dataValues.id);
          cart = null;
        }
      }
      if (cart && vendor.dataValues.id !== vendorId) {
        throw new ApiError(
          STATUS_CODES.BAD_REQUEST,
          'Invalid vendor selection'
        );
      }

      if (!cart) {
        vendor = await this.vendorDb.FindVendorById(vendorId);
        if (!vendor) {
          throw new ApiError(STATUS_CODES.NOT_FOUND, 'Vendor not found');
        }
        cart = await this.cartDb.CreateCart(user, vendor);
      }

      const body = { ...req.body, cartId: cart.dataValues.id };
      const cartItem = await this.cartItemDb.CreateCartItem(
        body,
        cart,
        menuItem
      );

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
      const cart = await this.cartItemDb.UpdateCartItem(req.params.itemId, {
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
      const cartItem = await this.cartItemDb.DeleteCartItemById(
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
      const cart = await this.cartDb.DeleteCartById(req.body.cartId);

      return res
        .status(STATUS_CODES.OK)
        .json(new ApiResponse(STATUS_CODES.OK, { cart }, 'User cart cleared'));
    } catch (error) {
      return next(error);
    }
  }
}

export default UserCartController;
