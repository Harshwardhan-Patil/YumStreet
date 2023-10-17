import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import Order from './Order.js';
import MenuItem from './MenuItem.js';

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Quantity can not be less then 1.',
        },
      },
    },
  },
  { sequelize, modelName: 'OrderItem' }
);

Order.hasMany(OrderItem, {
  foreignKey: {
    name: 'orderId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});
OrderItem.belongsTo(Order, {
  foreignKey: {
    name: 'orderId',
    allowNull: false,
  },
});

MenuItem.hasMany(OrderItem, {
  foreignKey: {
    name: 'menuItemId',
    allowNull: false,
  },
});
OrderItem.belongsTo(MenuItem, {
  foreignKey: {
    name: 'menuItemId',
    allowNull: false,
  },
});

export default OrderItem;
