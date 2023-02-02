import { Request, Response } from 'express';
import { db, QueryTypes } from '../config/database';
import { Issue } from '../models/Issue';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { UserDisplayName } from '../models/UserDisplayName';
import { Label } from '../models/Label';

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

    // Add labels to issue
    // for each label in labels<string[]>, create an association between current label and issue, should make records in junction table
    const issue: any = await Issue.findOne({
      where: {
        projectCode: code,
        issue_number: latestIssueNumber + 1,
      },
    });

    const labelObjects: any[] = [];
    for (let i = 0; i < labels.length; i++) {
      const label = await Label.findOne({
        where: {
          name: labels[i],
        },
      });
      labelObjects.push(label);
      // await issue.addLabel(label);
    }
    await issue.addLabels(labelObjects);
    issue.setDataValue('labels', labelObjects);

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

export { createIssue, getProjectIssues };
