import { DataTypes } from "sequelize";
import { db } from "../config/database";

const Label = db.define(
  "label",
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export { Label };
