import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import Cart from './Cart.js';
import MenuItem from './MenuItem.js';

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'CartItem' }
);

Cart.hasMany(CartItem, {
  foreignKey: {
    name: 'cartId',
    allowNull: false,
  },
});
CartItem.belongsTo(Cart, {
  foreignKey: {
    name: 'cartId',
    allowNull: false,
  },
});

MenuItem.hasMany(CartItem, {
  foreignKey: {
    name: 'menuItemId',
    allowNull: false,
  },
});
CartItem.belongsTo(MenuItem, {
  foreignKey: {
    name: 'cardId',
    allowNull: false,
  },
});

export default CartItem;
