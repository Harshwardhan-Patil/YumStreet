import fs from 'fs';
import path from 'path';
import ApiError from './ApiErrors.js';
import { STATUS_CODES } from '../constants.js';

class Helper {
  static GetLocalFilePath(filename) {
    if (typeof filename !== 'string' || filename.trim() === '') {
      throw new Error('Invalid or empty fileName provided.');
    }
    return path.join('public', 'images', filename);
  }

  static RemoveLocalFile(localPath) {
    if (fs.existsSync(localPath)) {
      fs.unlink(localPath, (err) => {
        if (err)
          throw new ApiError(
            STATUS_CODES.INTERNAL_ERROR,
            'Error while removing local files: '
          );
      });
    }
  }

  static RemoveUnusedMulterImageFilesOnError(req) {
    try {
      const multerImageFile = req.file;
      const multerImageFiles = req.files;

      if (multerImageFile) {
        this.RemoveLocalFile(multerImageFile.path);
      }

      if (multerImageFiles) {
        const fieldValueArray = Object.values(multerImageFiles);
        fieldValueArray.map((fieldValue) => {
          return fieldValue.map((fileObject) => {
            return this.RemoveLocalFile(fileObject.path);
          });
        });
      }
    } catch (error) {
      throw new ApiError(
        STATUS_CODES.INTERNAL_ERROR,
        'Error while removing image files: ',
        error
      );
    }
  }
}

export default Helper;
