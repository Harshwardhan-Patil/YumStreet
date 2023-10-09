import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import { AvailableOrderStatuses } from '../../constants.js';
import User from './User.js';
import Vendor from './Vendor.js';

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      values: AvailableOrderStatuses,
    },

    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    completedAt: {
      type: DataTypes.DATE,
    },
    cancelledAt: {
      type: DataTypes.DATE,
    },
    isPaymentDone: {
      type: DataTypes.BOOLEAN,
    },
  },
  { sequelize, modelName: 'Order', createdAt: true, updatedAt: true }
);

User.hasMany(Order, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Order.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

Vendor.hasMany(Order, {
  foreignKey: {
    name: 'vendorId',
    allowNull: false,
  },
});
Order.belongsTo(Vendor, {
  foreignKey: {
    name: 'vendorId',
    allowNull: false,
  },
});

export default Order;
