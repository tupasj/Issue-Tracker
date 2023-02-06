import { Request, Response } from 'express';
import { db, QueryTypes } from '../config/database';
import { Issue } from '../models/Issue';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { UserDisplayName } from '../models/UserDisplayName';
import { Label } from '../models/Label';

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
  const { code, email, title, priority, labels } = req.body;

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

    res.status(201).json(issue);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getProjectIssues = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const project: any = await Project.findOne({ where: { code } });
    const projectIssues = await project.getIssues();

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

export {
  createIssue,
  getProjectIssues,
  updateIssueLabels,
  updateIssuePriority,
};
