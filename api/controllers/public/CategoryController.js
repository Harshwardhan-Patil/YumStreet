import { CategoryRepository } from '../../database/index.js';
import ApiError from '../../utils/ApiErrors.js';
import ApiResponse from '../../utils/ApiResponse.js';

class CategoryController {
  constructor() {
    this.db = new CategoryRepository();
  }

  async CreateCategory(req, res, next) {
    try {
      const { name, description } = req.body;
      const isCategoryExist = await this.db.FindCategoryByName(name);
      if (isCategoryExist) {
        throw new ApiError('Category already exists');
      }
      const category = await this.db.CreateCategory({ name, description });
      return res
        .status(201)
        .json(
          new ApiResponse(201, { ...category }, 'Category created successfully')
        );
    } catch (error) {
      return next(error);
    }
  }

  async CreateCategoryInBulk(req, res, next) {
    try {
      const categories = await this.db.CreateCategories(req.body.data);
      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { ...categories },
            'Category created successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async SearchCategories(req, res, next) {
    try {
      const { query } = req.query;
      const categories = await this.db.FindCategoryByRegEX(query);
      console.log(categories);
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { ...categories },
            'Categories found successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async GetAllCategories(req, res, next) {
    try {
      const { page = 1, limit = 25 } = req.query;
      const categories = await this.db.FindAllCategories(page, limit);
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { ...categories },
            'Categories found successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async UpdateCategory(req, res, next) {
    try {
      const category = await this.db.UpdateCategory(
        req.params.categoryId,
        req.body
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { ...category[1] },
            'Categories found successfully'
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async DeleteCategory(req, res, next) {
    try {
      const category = await this.db.DeleteCategoryById(req.params.categoryId);
      return res
        .status(200)
        .json(new ApiResponse(201, category, 'Categories found successfully'));
    } catch (error) {
      return next(error);
    }
  }
}

export default CategoryController;
