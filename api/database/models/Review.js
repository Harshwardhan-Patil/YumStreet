import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import User from './User.js';
import Vendor from './Vendor.js';
import Order from './Order.js';

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          args: { min: 1, max: 5 },
          msg: 'Rating must be between 1 and 5.',
        },
      },
    },
    comment: {
      type: DataTypes.STRING(150),
    },
  },
  { sequelize, modelName: 'Review' }
);

User.hasMany(Review, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});
Review.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

Vendor.hasMany(Review, {
  foreignKey: {
    name: 'vendorId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});
Review.belongsTo(Vendor, {
  foreignKey: {
    name: 'vendorId',
    allowNull: false,
  },
});

Order.hasOne(Review, {
  foreignKey: {
    name: 'orderId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Review.belongsTo(Order, {
  foreignKey: {
    name: 'orderId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

export default Review;
