import { db, QueryTypes } from '../../config/database';
import { Issue } from '../../models/Issue';
import { Project } from '../../models/Project';
import { User } from '../../models/User';

const DBCreateIssue = async (
  code: string,
  email: string,
  title: string,
  priority: string
) => {
  const project: any = await Project.findOne({ where: { code } });
  const user: any = await User.findOne({ where: { email } });
  const queryResult: any = await db.query(
    `SELECT MAX(issue_number) FROM issues WHERE "projectCode"='${code}';`,
    { type: QueryTypes.SELECT }
  );
  const latestIssueNumber: number = queryResult[0].max;

  const issue: any = await Issue.create({
    title,
    priority,
    issue_number: latestIssueNumber + 1,
  });

  await project.addIssue(issue);
  await user.addIssue(issue);

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

const DBUpdateIssuePriority = async (
  issueNumber: string,
  projectCode: string,
  priority: string
) => {
  await Issue.update(
    { priority },
    {
      where: {
        issue_number: issueNumber,
        projectCode: projectCode,
      },
    }
  );
  const updatedIssue = await DBGetIssue(issueNumber, projectCode);
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
  DBUpdateIssuePriority,
  DBUpdateIssueTitle,
  DBUpdateIssueMilestoneId,
  DBDeleteIssue,
};
