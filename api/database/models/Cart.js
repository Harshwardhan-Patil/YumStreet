import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import User from './User.js';
import Vendor from './Vendor.js';

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

Vendor.hasMany(Cart, {
  foreignKey: { name: 'vendorId', allowNull: 'false' },
  onDelete: 'CASCADE',
});

Cart.belongsTo(Vendor, {
  foreignKey: { name: 'vendorId', allowNull: 'false' },
});

export default Cart;
