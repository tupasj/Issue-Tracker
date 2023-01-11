import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const Issue = db.define('issue', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  posted_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
  },
});

export { Issue };
