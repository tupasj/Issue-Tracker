import { DataTypes } from "sequelize";
import { db } from "../config/database";

const Project = db.define("project", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issue_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  user_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
});

export { Project };
