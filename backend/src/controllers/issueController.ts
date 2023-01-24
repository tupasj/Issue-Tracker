import { Request, Response } from 'express';
import { Issue } from '../models/Issue';
import { User } from '../models/User';
import { Project } from '../models/Project';

const createIssue = async (req: Request, res: Response) => {
  const { code, poster_email, title, description, priority } = req.body;

  try {
    const project: any = await Project.findOne({ where: { code } });
    const user: any = await User.findOne({ where: { email: poster_email } });

    let userDisplayName;
    if (user.display_name === 'full name') {
      userDisplayName = `${user.first_name} ${user.last_name}`;
    } else if (user.display_name === 'username') {
      userDisplayName = user.username;
    }

    const newIssue = await Issue.create({
      title,
      description,
      priority,
      posted_by: userDisplayName,
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
    res.status(200).json(projectIssues);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { createIssue, getProjectIssues };
