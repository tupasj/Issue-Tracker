import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const Comment = db.define('comment', {
  text_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { Comment };
