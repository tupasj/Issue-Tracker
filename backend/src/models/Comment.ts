import { DataTypes } from "sequelize";
import { db } from "../config/database";

const Comment = db.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text_content: {
    type: DataTypes.TEXT,
  },
  posted_by: {
    type: DataTypes.STRING,
  },
});

export { Comment };
