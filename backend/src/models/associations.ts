import { db } from '../config/database';
import { Project } from './Project';
import { User } from './User';
import { UserDisplayName } from './UserDisplayName';
import { Issue } from './Issue';
import { Comment } from './Comment';
import { Label } from './Label';

const establishSequelizeAssociations = async () => {
  // Project & User. Association: Many to many.
  Project.belongsToMany(User, { through: 'UserProjects' });
  User.belongsToMany(Project, { through: 'UserProjects' });
  // Project & Issue. Association: One to many.
  Project.hasMany(Issue, {
    onDelete: 'CASCADE',
  });
  Issue.belongsTo(Project);
  // User & UserDisplayName. Association: One to one.
  User.hasOne(UserDisplayName, {
    onDelete: 'CASCADE',
  });
  UserDisplayName.belongsTo(User);
  // User & Issue. Association: Many to many.
  User.belongsToMany(Issue, { through: 'UserIssues' });
  Issue.belongsToMany(User, { through: 'UserIssues' });
  // Issue & Comment. Association: One to many.
  Issue.hasMany(Comment, {
    onDelete: 'CASCADE',
  });
  Comment.belongsTo(Issue);
  // User & Comment. Association: One to many.
  User.hasMany(Comment, {
    onDelete: 'CASCADE',
  });
  Comment.belongsTo(User);
  // Issue & Label. Association: Many to many.
  Issue.belongsToMany(Label, { through: 'IssueLabels' });
  Label.belongsToMany(Issue, { through: 'IssueLabels' });

  await db.sync();
};

export { establishSequelizeAssociations };
