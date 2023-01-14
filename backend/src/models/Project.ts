import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const Project = db.define('project', {
  code: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Project };
