import { db } from '../config/database';
import { Project } from './Project';
import { User } from './User';
import { Issue } from './Issue';
import { Comment } from './Comment';

const establishSequelizeAssociations = async () => {
  // Project & User. Association: Many to many.
  Project.belongsToMany(User, { through: 'UserProjects' });
  User.belongsToMany(Project, { through: 'UserProjects' });
  // Project & Issue. Association: One to many.
  Project.hasMany(Issue, {
    onDelete: 'CASCADE',
  });
  Issue.belongsTo(Project);
  // User & Issue. Association: Many to many.
  User.belongsToMany(Issue, { through: 'UserIssues' });
  Issue.belongsToMany(User, { through: 'UserIssues' });
  // Issue and Comment. Association: one to many.
  Issue.hasMany(Comment, {
    onDelete: 'CASCADE',
  });
  Comment.belongsTo(Issue);
  // User and Comment. Association: one to many.
  User.hasMany(Comment, {
    onDelete: 'CASCADE',
  });
  Comment.belongsTo(User);

  await db.sync();
};

export { establishSequelizeAssociations };
