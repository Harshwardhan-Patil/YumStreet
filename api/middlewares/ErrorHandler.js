import { DatabaseError } from 'sequelize';
import { STATUS_CODES } from '../constants.js';
import ApiError from '../utils/ApiErrors.js';
import Helper from '../utils/Helper.js';

class ErrorHandler {
  static handle(err, req, res) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    let error = err;

    if (!(error instanceof ApiError)) {
      const statusCode =
        error.statusCode || error instanceof DatabaseError
          ? STATUS_CODES.BAD_REQUEST
          : STATUS_CODES.INTERNAL_ERROR;
      const message = error.message || 'Something went wrong';
      error = new ApiError(statusCode, message, error?.errors, error.stack);
    }

    const response = {
      ...error,
      message: error.message,
      ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
    };

    Helper.RemoveUnusedMulterImageFilesOnError(req);

    return res.status(error.statusCode).json(response);
  }
}

export default ErrorHandler;
