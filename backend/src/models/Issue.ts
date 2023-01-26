import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const Issue = db.define('issue', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  issue_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  posted_by: {
    type: DataTypes.STRING,
  },
  is_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: 'none',
  },
});

export { Issue };
