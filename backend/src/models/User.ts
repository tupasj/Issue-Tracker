import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const User = db.define('user', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: DataTypes.STRING,
  },
  first_name: {
    type: DataTypes.STRING,
    validate: {
      isAlpha: true,
    },
  },
  last_name: {
    type: DataTypes.STRING,
    validate: {
      isAlpha: true,
    },
  },
  display_name: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8,
      max: 100,
    },
  },
  profile_image: {
    type: DataTypes.STRING,
  },
  current_project: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'regular',
  },
});

export { User };
