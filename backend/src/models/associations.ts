import { db } from '../config/database';
import { Project } from './Project';
import { User } from './User';
import { Issue } from './Issue';

const establishSequelizeAssociations = async () => {
  // Project & User. Association: Many to many.
  Project.belongsToMany(User, { through: 'UserProjects' });
  User.belongsToMany(Project, { through: 'UserProjects' });
  // Project & Issue. Association: One to many.
  Project.hasMany(Issue);
  Issue.belongsTo(Project);
  // User & Issue. Association: Many to many.
  User.belongsToMany(Issue, { through: 'UserIssues' });
  Issue.belongsToMany(User, { through: 'UserIssues' });

  await db.sync();
};

export { establishSequelizeAssociations };
