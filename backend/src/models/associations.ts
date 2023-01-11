import { db } from '../config/database';
import { Project } from './Project';
import { User } from './User';

const establishSequelizeAssociations = async () => {
  // Project & User. Association: Many to many.
  Project.belongsToMany(User, { through: 'UserProjects' });
  User.belongsToMany(Project, { through: 'UserProjects' });

  await db.sync();
};

export { establishSequelizeAssociations };
