import { Request, Response } from 'express';
import { Issue } from '../models/Issue';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { UserDisplayName } from '../models/UserDisplayName';

const createIssue = async (req: Request, res: Response) => {
  const { code, email, title, priority } = req.body;

  try {
    const project: any = await Project.findOne({ where: { code } });
    const projectIssues = await project.getIssues();
    const user: any = await User.findOne({ where: { email } });

    const newIssue: any = await Issue.create({
      title,
      priority,
      issue_number: projectIssues.length + 1,
    });

    await project.addIssue(newIssue);
    await user.addIssue(newIssue);

    res.status(201).json(newIssue);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getProjectIssues = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const project: any = await Project.findOne({ where: { code } });
    const projectIssues = await project.getIssues();

    // add display_name property to each element in projectIssues array
    for (let i = 0; i < projectIssues.length; i++) {
      const user = await projectIssues[i].getUsers();
      const userDisplayName: any = await UserDisplayName.findOne({
        where: { userEmail: user[0].email },
      });
      projectIssues[i].setDataValue('postedBy', userDisplayName.display_name);
    }

    res.status(200).json(projectIssues);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { createIssue, getProjectIssues };
