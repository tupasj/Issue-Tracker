import { DataTypes } from "sequelize";
import { db } from "../config/database";

const User = db.define("user", {
  email: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
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
