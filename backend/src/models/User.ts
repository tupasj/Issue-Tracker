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
    validate: {
      min: 2,
      max: 50,
    },
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
  phone_number: {
    type: DataTypes.STRING,
    validate: {
      is: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    },
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
    defaultValue:
      'https://res.cloudinary.com/doje91kts/image/upload/v1674677491/Web%20Development%20Projects/Issue%20Tracker/anonymous-user_fum7lh.png',
  },
  current_project: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'offline',
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'regular',
  },
});

export { User };
