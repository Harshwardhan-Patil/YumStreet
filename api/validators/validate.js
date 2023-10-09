import { validationResult } from 'express-validator';
import { STATUS_CODES } from '../constants.js';
import ApiError from '../utils/ApiErrors.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  throw new ApiError(
    STATUS_CODES.UNPROCESSABLE_ENTITY,
    'Received data is not valid',
    extractedErrors
  );
};

export default validate;
