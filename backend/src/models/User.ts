import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const User = db.define('user', {
  email: {
    type: DataTypes.STRING,
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
  phone_number: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      min: 8,
      max: 100,
    },
  },
  profile_image: {
    type: DataTypes.STRING,
  },
  project_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  status: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'regular',
  },
});

if (process.env.TESTING == 'false') {
  (async () => {
    await db.sync();
  })();
}

export { User };
