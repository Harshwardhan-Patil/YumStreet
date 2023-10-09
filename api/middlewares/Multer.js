import multer from 'multer';
import { FILE_EXTENSIONS, STATUS_CODES } from '../constants.js';
import ApiError from '../utils/ApiErrors.js';

class Multer {
  // eslint-disable-next-line class-methods-use-this
  GetFileExtension = (file) => {
    if (file.originalname.split('.').length < 1) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, 'No file extension found');
    }
    return file.originalname.substring(file.originalname.lastIndexOf('.'));
  };

  Storage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './public/images');
      },
      filename: (req, file, cb) => {
        const fileExtension = this.GetFileExtension(file);
        const filenameWithoutExtension = file.originalname
          .toLowerCase()
          .split(' ')
          .join('-')
          ?.split('.')[0];

        cb(
          null,
          filenameWithoutExtension +
            Date.now() +
            Math.ceil(Math.random() * 1e6) +
            fileExtension
        );
      },
    });
  }

  FileFilter = (req, file, cb) => {
    if (!FILE_EXTENSIONS.includes(this.GetFileExtension(file))) {
      cb(
        new ApiError(
          STATUS_CODES.UNPROCESSABLE_ENTITY,
          'Invalid file type. Only .png, .jpg, and .jpeg files are allowed'
        )
      );
    } else {
      cb(null, true);
    }
  };
}

const multerUpload = new Multer();
const upload = multer({
  storage: multerUpload.Storage(),
  fileFilter: multerUpload.FileFilter,
});

export default upload;
