/* eslint-disable consistent-return */
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import ApiError from './ApiErrors.js';
import { STATUS_CODES } from '../constants.js';
import { OPEN_CAGE_DATA_API_KEY } from '../config/index.js';

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

  static async GetPaginationOptions(Model, page = 1, limit = 25, query = {}) {
    const startIndex = page > 0 ? (page - 1) * limit : 0;
    const endIndex = page > 0 ? page * limit : 1 * limit;

    const length = await Model.count({ ...query });
    const pagination = {
      currentPage: page,
      hasNextPage: length - endIndex > 0,
      lastVisiblePage: Math.ceil(length / limit),
    };

    return { pagination, offset: startIndex, limit: endIndex };
  }

  /* The haversine formula determines the great-circle distance between two points
    on a sphere given their longitudes and latitudes. 
     a = sin^2(dLatitude/2) + cos(latitude1) + cos(latitude2) + sin^2(dLongitude/2);
     c = 2 * atan2(sqrt(a),sqrt(1-a))
     distance = R * c; // R Radius of the Earth
   */
  static haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6378.1; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Difference in latitude in radians
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Difference in longitude in radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  }

  static GetAverageRating(Reviews) {
    let averageRating = 0.0;
    if (Reviews.length > 0) {
      const totalRating = Reviews.reduce((total, review) => {
        return total + review.rating;
      }, 0);
      averageRating = totalRating / Reviews.length;
    }
    return averageRating;
  }

  static async GetLocationFromLatLng(lat, lng) {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPEN_CAGE_DATA_API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async GetLocationFromCity(city) {
    if (city === '' && !city) return;
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPEN_CAGE_DATA_API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async GetLocationByIpAddress(ipAddress) {
    try {
      const response = await fetch(`https://ipapi.co/${ipAddress}/json`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Helper;
