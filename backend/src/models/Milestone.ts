import { DataTypes } from "sequelize";
import { db } from "../config/database";

const Milestone = db.define(
  "milestone",
  {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    issue_numbers: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  },
  {
    timestamps: false,
  }
);

export { Milestone };