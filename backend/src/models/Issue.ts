import { DataTypes } from "sequelize";
import { db } from "../config/database";

const Issue = db.define("issue", {
  title: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  posted_by: {
    type: DataTypes.STRING,
  },
  is_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  assignee_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  labels: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  project_id: {
    type: DataTypes.INTEGER,
  },
  milestone: {
    type: DataTypes.STRING,
  },
  comment_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
});

export { Issue };
