import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import Vendor from './Vendor.js';
import Category from './Category.js';

class MenuItem extends Model {}

MenuItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isVeg: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isPositiveOrZero: (value) => {
          const priceValue = parseFloat(value);
          if (Number.isNaN(priceValue) || priceValue < 0) {
            throw new Error('Price must be a positive number or zero');
          }
        },
      },
    },
    image: {
      type: DataTypes.JSONB,
      defaultValue: {
        url: 'https://via.placeholder.com/200x200.png',
        localPath: '',
      },
    },
  },
  { sequelize, modelName: 'MenuItem' }
);

Vendor.hasMany(MenuItem, {
  foreignKey: {
    name: 'vendorId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});
MenuItem.belongsTo(Vendor, {
  foreignKey: {
    name: 'vendorId',
    allowNull: false,
  },
});

Category.hasMany(MenuItem, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
});
MenuItem.belongsTo(Category, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
});

export default MenuItem;
