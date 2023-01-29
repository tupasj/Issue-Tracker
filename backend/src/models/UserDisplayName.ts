import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const UserDisplayName = db.define(
  'userDisplayName',
  {
    display_name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export { UserDisplayName };
