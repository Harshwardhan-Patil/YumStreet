import { Op } from 'sequelize';
import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { Category } from '../models/index.js';
import Helper from '../../utils/Helper.js';

class CategoryRepository {
  constructor() {
    this.model = Category;
  }

  async CreateCategory({ name, description }) {
    try {
      const category = await this.model.create({
        name,
        description,
      });
      return category;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create category',
        error
      );
    }
  }

  async CreateCategories(data) {
    try {
      const categories = await this.model.bulkCreate(data, {
        updateOnDuplicate: ['name'],
      });
      return categories;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create category',
        error
      );
    }
  }

  async FindCategoryByName(name) {
    try {
      const category = await this.model.findOne({ where: { name } });
      return category;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find categories',
        error
      );
    }
  }

  async FindAllCategories(modelOffset, modelLimit) {
    try {
      const { pagination, offset, limit } = await Helper.GetPaginationOptions(
        modelOffset,
        modelLimit,
        this.model
      );
      const categories = await this.model.findAndCountAll({ offset, limit });
      return { pagination, ...categories };
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find categories',
        error
      );
    }
  }

  async FindCategoryById(id) {
    try {
      const category = await this.model.findByPk(id);
      return category;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find category',
        error
      );
    }
  }

  async FindCategoryByRegEX(query) {
    try {
      const categories = await this.model.findAll({
        where: { name: { [Op.iLike]: `%${query}%` } },
        limit: 25,
      });
      return categories;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find categories',
        error
      );
    }
  }

  async UpdateCategory(id, categoryDataToUpdate) {
    try {
      const validCategoryDataToUpdate = await Filter.GetValidAttributes(
        categoryDataToUpdate,
        this.model
      );
      const category = await this.model.update(validCategoryDataToUpdate, {
        where: { id },
        returning: true,
      });
      return category;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update category',
        error
      );
    }
  }

  async DeleteCategoryById(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Order deleted successfully';
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to delete category',
        error
      );
    }
  }
}

export default CategoryRepository;
