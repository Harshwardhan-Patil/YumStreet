import { Router } from 'express';
import Authenticator from '../../middlewares/Authenticator.js';
import UserCartController from '../../controllers/user/UserCartController.js';
import UserCartValidator from '../../validators/users/UserCartValidator.js';
import validate from '../../validators/validate.js';

const router = Router();

// url "/api/users/:userId/cart/*"
/*
POST /api/cart/items: Add an item to the user's cart (requires user authentication).
GET /api/cart/items: Get the items in the user's cart (requires user authentication).
PUT /api/cart/items/:cartItemId: Update item quantity in the cart (requires user authentication).
DELETE /api/cart/items/:cartItemId: Remove an item from the user's cart (requires user authentication).
DELETE /api/cart/clear: Clear all items from the user's cart (requires user authentication).
*/

const UserCart = new UserCartController();
router.use(Authenticator.VerifyToken);

router
  .route('/items')
  .get(UserCart.GetUserCart.bind(UserCart))
  .post(
    UserCartValidator.CreateCart(),
    validate,
    UserCart.CreateUserCart.bind(UserCart)
  );

router
  .route('/items/:itemId')
  .put(
    UserCartValidator.UpdateCartItem(),
    validate,
    UserCart.UpdateUserCart.bind(UserCart)
  )
  .delete(UserCart.DeleteUserCartItem.bind(UserCart));

router
  .route('/clear')
  .delete(
    UserCartValidator.ClearUserCart(),
    validate,
    UserCart.ClearUserCart.bind(UserCart)
  );

export default router;
