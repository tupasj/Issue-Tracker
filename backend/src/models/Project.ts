import { DataTypes } from "sequelize";
import { db } from "../config/database";

const Project = db.define("project", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  issue_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  user_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
});

export { Project };
