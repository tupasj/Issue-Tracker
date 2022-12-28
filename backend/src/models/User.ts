import { DataTypes } from "sequelize";
import { db } from "../config/database";

const User = db.define("user", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.INTEGER,
  },
  project_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  status: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: "regular",
  },
});

export { User };
