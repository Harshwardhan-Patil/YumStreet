import { STATUS_CODES } from '../constants.js';
import ApiError from './ApiErrors.js';

class Filter {
  static async GetValidAttributes(attributes, Model, isInclude = true) {
    try {
      const isArray = Array.isArray(attributes);
      const attributeKeys = isArray ? attributes : Object.keys(attributes);
      const describedAttributes = Object.keys(await Model.describe());
      const validAttributes = describedAttributes.filter((attribute) =>
        isInclude
          ? attributeKeys.includes(attribute)
          : !attributeKeys.includes(attribute)
      );
      if (isArray) {
        return validAttributes;
      }
      const validAttribute = {};
      validAttributes.forEach((attribute) => {
        validAttribute[attribute] = attributes[attribute];
      });
      return validAttribute;
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Error while checking attribute'
      );
    }
  }
}

export default Filter;
