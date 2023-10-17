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
      validate: {
        isValidQuantity: (value) => {
          if (parseInt(value, 10) <= 0) {
            throw new Error(
              'Price must be a positive number and greater than zero'
            );
          }
        },
      },
    },
  },
  { sequelize, modelName: 'CartItem' }
);

Cart.hasMany(CartItem, {
  foreignKey: {
    name: 'cartId',
    allowNull: false,
    onDelete: 'CASCADE',
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
    onDelete: 'CASCADE',
  },
});
CartItem.belongsTo(MenuItem, {
  foreignKey: {
    name: 'menuItemId',
    allowNull: false,
  },
});

export default CartItem;
