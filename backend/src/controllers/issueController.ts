import { Request, Response } from 'express';
import { db } from '../config/database';
import { Issue } from '../models/Issue';
import { User } from '../models/User';
import { Label } from '../models/Label';
import {
  DBCreateIssue,
  DBGetIssue,
  DBUpdateIssuePriority,
  DBUpdateIssueTitle,
  DBUpdateIssueMilestoneId,
  DBUpdateIssueAssignees,
  DBDeleteIssue,
} from '../utils/database/issueQueries';
import { DBGetUser } from '../utils/database/userQueries';
import { DBGetLabels } from '../utils/database/labelQueries';
import { DBGetUserDisplayName } from '../utils/database/userDisplayNameQueries';
import { DBGetMilestone } from '../utils/database/milestoneQueries';
import { DBGetProject } from '../utils/database/projectQueries';

const getLabelObjects = async (labelNames: string[]) => {
  const labelObjects: any[] = [];
  for (let i = 0; i < labelNames.length; i++) {
    try {
      const label = await Label.findOne({
        where: {
          name: labelNames[i],
        },
      });
      labelObjects.push(label);
    } catch (error: any) {
      return error;
    }
  }
  return labelObjects;
};

const createIssue = async (req: Request, res: Response) => {
  const { code, email, title, assignees, priority, labels, currentMilestone } =
    req.body;

  try {
    const issue = await DBCreateIssue(code, email, title, priority);

    // Associate each assignee user to the issue
    for (let i = 0; i < assignees.length; i++) {
      const user = await DBGetUser(assignees[i].email);
      await issue.addUser(user);
    }

    // Add labels property
    const labelObjects = await DBGetLabels(labels);
    await issue.addLabels(labelObjects);
    issue.setDataValue('labels', labelObjects);

    // Add milestone property
    if (currentMilestone) {
      const milestone = await DBGetMilestone(currentMilestone);
      await milestone.addIssue(issue);
      issue.setDataValue('milestone', milestone);
    }

    res.status(201).json(issue);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getProjectIssues = async (req: Request, res: Response) => {
  const { code, openStatus } = req.params;
  const { isOpen } = req.query;

  try {
    const project = await DBGetProject(code);

    let projectIssues;
    if (openStatus) {
      projectIssues = await project.getIssues({ where: { is_open: isOpen } });
    } else {
      projectIssues = await project.getIssues();
    }

    // Add labels property
    for (let i = 0; i < projectIssues.length; i++) {
      const issueLabels = await projectIssues[i].getLabels();
      projectIssues[i].setDataValue('labels', issueLabels);
    }

    projectIssues.sort((a: any, b: any) => b.issue_number - a.issue_number);
    res.status(200).json(projectIssues);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getUserIssues = async (req: Request, res: Response) => {
  const { email, openStatus } = req.params;
  const { isOpen } = req.query;

  try {
    const user: any = await User.findOne({ where: { email } });

    let userIssues;
    if (openStatus) {
      userIssues = await user.getIssues({ where: { is_open: isOpen } });
    } else {
      userIssues = await user.getIssues();
    }

    // Add postedBy and labels properties to each element in userIssues array
    for (let i = 0; i < userIssues.length; i++) {
      const user = await userIssues[i].getUsers();
      const userDisplayName: any = await DBGetUserDisplayName(user[0].email);
      userIssues[i].setDataValue('postedBy', userDisplayName.display_name);
      const issueLabels = await userIssues[i].getLabels();
      userIssues[i].setDataValue('labels', issueLabels);
    }

    userIssues.sort((a: any, b: any) => b.issue_number - a.issue_number);
    res.status(200).json(userIssues);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getIssueLabels = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;

  try {
    const issue = await DBGetIssue(issueNumber, projectCode);
    const issueLabels = await issue.getLabels();

    res.status(200).json(issueLabels);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateIssueLabels = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;
  const { email, labelNames } = req.body;

  try {
    const issue = await DBGetIssue(issueNumber, projectCode);
    const issueLabelObjects = await getLabelObjects(labelNames);
    await issue.setLabels(issueLabelObjects);
    issue.setDataValue('labels', issueLabelObjects);

    const userDisplayName: any = await DBGetUserDisplayName(email);
    issue.setDataValue('postedBy', userDisplayName.display_name);

    res.status(200).json(issue);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateIssuePriority = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;
  const { priority } = req.body;

  try {
    const updatedIssue = await DBUpdateIssuePriority(
      issueNumber,
      projectCode,
      priority
    );
    res.status(200).json(updatedIssue);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateIssueTitle = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;
  const { title } = req.body;

  try {
    const updatedIssue = await DBUpdateIssueTitle(
      issueNumber,
      projectCode,
      title
    );
    res.status(200).json(updatedIssue);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateIssueAssignees = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;
  const { assignees } = req.body;

  try {
    await DBUpdateIssueAssignees(issueNumber, projectCode, assignees);

    res.status(200).json();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateIssueMilestone = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;
  const { milestoneId } = req.body;

  try {
    if (milestoneId === 9999) {
      // get current milestone
      // remove association
      const issue = await DBGetIssue(issueNumber, projectCode);
      res.status(200).end();
    }
    const updatedIssue = await DBUpdateIssueMilestoneId(
      issueNumber,
      projectCode,
      milestoneId
    );
    res.status(200).json(updatedIssue);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const removeIssueMilestone = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;

  try {
    await db.query(
      `UPDATE issues SET "milestoneId" = null WHERE "projectCode"='${projectCode}' AND issue_number=${issueNumber};`
    );

    res.status(200).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;

  try {
    await DBDeleteIssue(issueNumber, projectCode);
    res.status(200).end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const assignIssueUsers = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;
  const { assignees } = req.body;

  try {
    const issue: any = await DBGetIssue(issueNumber, projectCode);

    for (let i = 0; i < assignees.length; i++) {
      const user = await DBGetUser(assignees[i].email);

      await issue.addUser(user);
    }

    res.status(200).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getIssueUsers = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;

  try {
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

    res.status(200).json(issueUsers);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getIssueMilestone = async (req: Request, res: Response) => {
  const { issueNumber } = req.params;

  try {
    const issue: any = await Issue.findOne({
      where: {
        issue_number: issueNumber,
      },
    });
    const issueMilestone = await issue.getMilestone();

    res.status(200).json(issueMilestone);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createIssue,
  getProjectIssues,
  getUserIssues,
  getIssueLabels,
  updateIssueLabels,
  updateIssuePriority,
  updateIssueTitle,
  updateIssueMilestone,
  updateIssueAssignees,
  removeIssueMilestone,
  deleteIssue,
  assignIssueUsers,
  getIssueUsers,
  getIssueMilestone,
};
