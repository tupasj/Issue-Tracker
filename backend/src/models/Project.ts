import { DataTypes } from 'sequelize';
import { db } from '../config/database';
import { User } from './User';

const Project = db.define('project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// const UserProjects = db.define('UserProjects', {
//   UserId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User,
//       key: 'id',
//     },
//   },
//   ProjectId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Project,
//       key: 'id',
//     },
//   },
// });

// Project.belongsToMany(User, { through: 'UserProjects' });
// User.belongsToMany(Project, { through: 'UserProjects' });

// if (process.env.TESTING == 'false') {
//   (async () => {
//     await db.sync();
//   })();
// }

export { Project };
