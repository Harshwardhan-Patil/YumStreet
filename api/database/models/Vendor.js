import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import User from './User.js';
import Address from './Address.js';
// TODO: Add license column
class Vendor extends Model {}

Vendor.init(
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
      type: DataTypes.STRING,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    openingTime: {
      type: DataTypes.TIME,
    },
    closingTime: {
      type: DataTypes.TIME,
    },
    license: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendorImages: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
  },
  { sequelize, modelName: 'Vendor' }
);

User.hasOne(Vendor);
Vendor.belongsTo(User);

Address.hasOne(User);
Vendor.belongsTo(Address);

Vendor.addHook('beforeDestroy', async (vendor) => {
  const address = await vendor.getAddress();
  if (address) {
    await address.destroy();
  }
});

export default Vendor;
