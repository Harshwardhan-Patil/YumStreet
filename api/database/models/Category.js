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
    image: {
      type: DataTypes.JSONB,
      defaultValue: {
        url: 'https://via.placeholder.com/200x200.png',
        localPath: '',
      },
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Category' }
);

export default Category;
