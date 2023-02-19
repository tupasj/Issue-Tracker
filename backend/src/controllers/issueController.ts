import { Request, Response } from 'express';
import { db, QueryTypes } from '../config/database';
import { Issue } from '../models/Issue';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { UserDisplayName } from '../models/UserDisplayName';
import { Label } from '../models/Label';
import { Milestone } from '../models/Milestone';

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
    const project: any = await Project.findOne({ where: { code } });
    const user: any = await User.findOne({ where: { email } });
    const queryResult: any = await db.query(
      `SELECT MAX(issue_number) FROM issues WHERE "projectCode"='${code}';`,
      { type: QueryTypes.SELECT }
    );
    const latestIssueNumber: number = queryResult[0].max;

    const newIssue: any = await Issue.create({
      title,
      priority,
      issue_number: latestIssueNumber + 1,
    });

    await project.addIssue(newIssue);
    await user.addIssue(newIssue);

    const issue: any = await Issue.findOne({
      where: {
        projectCode: code,
        issue_number: latestIssueNumber + 1,
      },
    });

    // For each string element in labels array, get the corresponding label object from database
    const labelObjects: any[] = [];
    for (let i = 0; i < labels.length; i++) {
      const label = await Label.findOne({
        where: {
          name: labels[i],
        },
      });
      labelObjects.push(label);
    }
    // Make Issues and Label association and attach labels property to response object
    await issue.addLabels(labelObjects);
    issue.setDataValue('labels', labelObjects);

    // Attach display_name property to response object
    const userDisplayName: any = await UserDisplayName.findOne({
      where: { userEmail: email },
    });
    issue.setDataValue('postedBy', userDisplayName.display_name);

    // Add assignees to issue
    for (let i = 0; i < assignees.length; i++) {
      const user = await User.findOne({
        where: {
          email: assignees[i].email,
        },
      });
      await issue.addUser(user);
    }

    // Add milestone
    const milestone: any = await Milestone.findOne({
      where: { id: currentMilestone.id },
    });
    await milestone.addIssue(issue);
    issue.setDataValue('milestone', milestone);

    res.status(201).json(issue);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getProjectIssues = async (req: Request, res: Response) => {
  const { code, openStatus } = req.params;
  const { isOpen } = req.query;

  try {
    const project: any = await Project.findOne({ where: { code } });

    let projectIssues;
    if (openStatus) {
      projectIssues = await project.getIssues({ where: { is_open: isOpen } });
    } else {
      projectIssues = await project.getIssues();
    }

    // Add postedBy and labels properties to each element in projectIssues array
    for (let i = 0; i < projectIssues.length; i++) {
      const user = await projectIssues[i].getUsers();
      const userDisplayName: any = await UserDisplayName.findOne({
        where: { userEmail: user[0].email },
      });
      projectIssues[i].setDataValue('postedBy', userDisplayName.display_name);
      const issueLabels = await projectIssues[i].getLabels();
      projectIssues[i].setDataValue('labels', issueLabels);
    }

    projectIssues.sort((a: any, b: any) => b.issue_number - a.issue_number);
    res.status(200).json(projectIssues);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateIssueLabels = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;
  const { email, labelNames } = req.body;

  try {
    const issue: any = await Issue.findOne({
      where: {
        issue_number: issueNumber,
        projectCode: projectCode,
      },
    });
    const issueLabelObjects = await getLabelObjects(labelNames);
    await issue.setLabels(issueLabelObjects);
    issue.setDataValue('labels', issueLabelObjects);

    const userDisplayName: any = await UserDisplayName.findOne({
      where: { userEmail: email },
    });
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
    await Issue.update(
      { priority },
      {
        where: {
          issue_number: issueNumber,
          projectCode: projectCode,
        },
      }
    );
    const updatedIssue = await Issue.findOne({
      where: {
        issue_number: issueNumber,
        projectCode: projectCode,
      },
    });
    res.status(200).json(updatedIssue);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;

  try {
    await Issue.destroy({
      where: {
        issue_number: issueNumber,
        projectCode: projectCode,
      },
    });
    res.status(200).end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const assignIssueUsers = async (req: Request, res: Response) => {
  const { issueNumber, projectCode } = req.params;
  const { assignees } = req.body;

  try {
    const issue: any = await Issue.findOne({
      where: {
        issue_number: issueNumber,
        projectCode: projectCode,
      },
    });

    for (let i = 0; i < assignees.length; i++) {
      const user = await User.findOne({
        where: {
          email: assignees[i].email,
        },
      });
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
    const issue: any = await Issue.findOne({
      where: {
        issue_number: issueNumber,
        projectCode: projectCode,
      },
    });
    const issueUsers: any[] = await issue.getUsers({
      attributes: {
        exclude: ['password'],
      },
    });

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
  updateIssueLabels,
  updateIssuePriority,
  deleteIssue,
  assignIssueUsers,
  getIssueUsers,
  getIssueMilestone,
};
