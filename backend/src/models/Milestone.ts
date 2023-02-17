import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const Milestone = db.define(
  'milestone',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    is_open: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export { Milestone };
