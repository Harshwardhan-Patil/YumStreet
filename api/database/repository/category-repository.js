import { STATUS_CODES } from '../../constants.js';
import ApiError from '../../utils/ApiErrors.js';
import Filter from '../../utils/Filter.js';
import { Category } from '../models/index.js';

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
        'Unable to create category'
      );
    }
  }

  async FindCategoryById(id, attributes = []) {
    try {
      const category = await this.model.findByPk(id, {
        attributes,
      });
      return category;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to find category'
      );
    }
  }

  async UpdateCategory(id, categoryDataToUpdate) {
    try {
      const validCategoryDataToUpdate =
        await Filter.GetValidAttributes(categoryDataToUpdate);
      const category = await this.model.update(validCategoryDataToUpdate, {
        where: { id },
      });
      return category;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to update category'
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
        'Unable to delete category'
      );
    }
  }
}

export default CategoryRepository;
