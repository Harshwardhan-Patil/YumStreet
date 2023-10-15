import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize, modelName: 'Category' }
);

export default Category;
