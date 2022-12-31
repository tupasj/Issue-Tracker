import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const Comment = db.define('comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  posted_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

if (process.env.TESTING == 'false') {
  (async () => {
    await db.sync();
  })();
}

export { Comment };
