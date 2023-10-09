import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

class Address extends Model {}

Address.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING(6),
      validate: {
        is: {
          args: /^\d{6}$/,
          msg: 'Invalid PIN code format. It must be a 6-digit number.',
        },
      },
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      validate: {
        min: -180,
        max: 180,
      },
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      validate: {
        min: -90,
        max: 90,
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Address',
    validate: {
      bothCoordsOrNone() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error('Either both latitude and longitude, or neither!');
        }
      },
    },
  }
);

export default Address;
