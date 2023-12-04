import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import { AvailableUserRoles, UserRolesEnum } from '../../constants.js';
import Address from './Address.js';

class User extends Model {
  getFullName() {
    return [this.firstname, this.lastname].join(' ');
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    avatar: {
      type: DataTypes.JSONB,
      defaultValue: {
        url: 'https://via.placeholder.com/200x200.png',
        localPath: '',
      },
    },
    firstname: {
      type: DataTypes.STRING(100),
    },
    lastname: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        is: /^\+[1-9]\d{1,14}$/i,
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: UserRolesEnum.USER,
      values: AvailableUserRoles,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'User' }
);

Address.hasOne(User);
User.belongsToMany(Address, { through: 'userAddress', onDelete: 'CASCADE' });

export default User;
