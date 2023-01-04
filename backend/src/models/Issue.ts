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
  assignee_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  labels: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  project_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  milestone: {
    type: DataTypes.STRING,
  },
  comment_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
});

export { Issue };
