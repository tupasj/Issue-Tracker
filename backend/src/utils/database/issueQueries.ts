import { db, QueryTypes } from '../../config/database';
import { Issue } from '../../models/Issue';
import { Project } from '../../models/Project';
import { DBGetUserDisplayName } from './userDisplayNameQueries';

const DBCreateIssue = async (
  code: string,
  email: string,
  title: string,
  priority: string
) => {
  const project: any = await Project.findOne({ where: { code } });
  const queryResult: any = await db.query(
    `SELECT MAX(issue_number) FROM issues WHERE "projectCode"='${code}';`,
    { type: QueryTypes.SELECT }
  );
  const latestIssueNumber: number = queryResult[0].max;
  const postedBy = await DBGetUserDisplayName(email);

  const issue: any = await Issue.create({
    title,
    priority,
    issue_number: latestIssueNumber + 1,
    postedBy: postedBy.display_name,
    postedByEmail: email,
  });

  await project.addIssue(issue);

  return issue;
};

const DBGetIssue = async (issueNumber: string, projectCode: string) => {
  const issue: any = await Issue.findOne({
    where: {
      issue_number: issueNumber,
      projectCode: projectCode,
    },
  });

  return issue;
};

const DBGetIssueUsers = async (issueNumber: string, projectCode: string) => {
  const issue: any = await DBGetIssue(issueNumber, projectCode);
  const issueUsers: any[] = await issue.getUsers({
    attributes: {
      exclude: ['password'],
    },
  });

  for (let i = 0; i < issueUsers.length; i++) {
    const userDisplayName: any = await DBGetUserDisplayName(
      issueUsers[i].email
    );
    issueUsers[i].setDataValue('display_name', userDisplayName.display_name);
  }

  return issueUsers;
};

const DBUpdateIssuePriority = async (
  issueNumber: string,
  projectCode: string,
  priority: string
) => {
  const updatedIssue = await Issue.update(
    { priority },
    {
      where: {
        issue_number: issueNumber,
        projectCode: projectCode,
      },
    }
  );
  return updatedIssue;
};

const DBUpdateIssueTitle = async (
  issueNumber: string,
  projectCode: string,
  title: string
) => {
  const updatedIssue = await Issue.update(
    { title },
    {
      where: {
        issue_number: issueNumber,
        projectCode: projectCode,
      },
    }
  );
  return updatedIssue;
};

const DBUpdateIssueMilestoneId = async (
  issueNumber: string,
  projectCode: string,
  milestoneId: any
) => {
  const updatedIssue = await Issue.update(
    { milestoneId },
    {
      where: {
        issue_number: issueNumber,
        projectCode: projectCode,
      },
    }
  );

  return updatedIssue;
};

const DBUpdateIssueAssignees = async (
  issueNumber: string,
  projectCode: string,
  assignees: any[]
) => {
  const issue: any = await DBGetIssue(issueNumber, projectCode);

  await issue.setUsers([]);

  for (let i = 0; i < assignees.length; i++) {
    await issue.addUser(assignees[i].email);
  }
};

const DBDeleteIssue = async (issueNumber: string, projectCode: string) => {
  await Issue.destroy({
    where: {
      issue_number: issueNumber,
      projectCode: projectCode,
    },
  });
};

export {
  DBCreateIssue,
  DBGetIssue,
  DBGetIssueUsers,
  DBUpdateIssuePriority,
  DBUpdateIssueTitle,
  DBUpdateIssueMilestoneId,
  DBUpdateIssueAssignees,
  DBDeleteIssue,
};
