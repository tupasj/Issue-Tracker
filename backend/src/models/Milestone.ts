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
  },
  {
    timestamps: false,
  }
);

export { Milestone };
