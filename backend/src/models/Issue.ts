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
  issue_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  postedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Issue };
