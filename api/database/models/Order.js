import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import { AvailableOrderStatuses, OrderStatusEnum } from '../../constants.js';
import User from './User.js';
import Vendor from './Vendor.js';
import Address from './Address.js';

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
      defaultValue: OrderStatusEnum.PENDING,
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

Order.belongsTo(Address, { foreignKey: 'addressId' });
Address.hasOne(Order, { foreignKey: 'addressId' });

export default Order;
