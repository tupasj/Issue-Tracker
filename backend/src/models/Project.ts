import { DataTypes } from 'sequelize';
import { db } from '../config/database';

const Project = db.define('project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issue_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  user_emails: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

if (process.env.TESTING == 'false') {
  (async () => {
    await db.sync();
  })();
}

export { Project };
