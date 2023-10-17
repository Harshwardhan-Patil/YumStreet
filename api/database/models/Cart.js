import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import User from './User.js';

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'Cart', createdAt: true, updatedAt: true }
);

User.hasMany(Cart, {
  foreignKey: { name: 'userId', allowNull: 'false' },
  onDelete: 'CASCADE',
});
Cart.belongsTo(User, { foreignKey: { name: 'userId', allowNull: 'false' } });

export default Cart;
