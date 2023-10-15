import { Router } from 'express';
// import Authenticator from '../../middlewares/Authenticator.js';
import CategoriesValidator from '../../validators/public/CategoriesValidator.js';
import validate from '../../validators/validate.js';
import CategoryController from '../../controllers/public/CategoryController.js';

const router = Router();
const Category = new CategoryController();
router.route('/').get(Category.GetAllCategories.bind(Category)).post(
  // Authenticator.VerifyToken,
  CategoriesValidator.CreateCategory(),
  validate,
  Category.CreateCategory.bind(Category)
);
router
  .route('/multiple')
  .post(
    CategoriesValidator.CreateCategoryInBulk(),
    validate,
    Category.CreateCategoryInBulk.bind(Category)
  );
router
  .route('/search')
  .get(
    CategoriesValidator.SearchCategories(),
    validate,
    Category.SearchCategories.bind(Category)
  );

router
  .route('/:categoryId')
  .put(
    CategoriesValidator.UpdateCategory(),
    validate,
    Category.UpdateCategory.bind(Category)
  )
  .delete(Category.DeleteCategory.bind(Category));

export default router;
