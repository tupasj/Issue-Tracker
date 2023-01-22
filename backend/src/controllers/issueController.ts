import { Request, Response } from 'express';
import { db, QueryTypes } from '../config/database';
import { Issue } from '../models/Issue';
import { User } from '../models/User';

const createIssue = async (req: Request, res: Response) => {
  const { email, title, priority } = req.body;

  try {
    const user: any = await User.findOne({ where: { email } });
    const newIssue = await Issue.create({
      title,
      posted_by: user.display_name,
      priority,
    });
    res.status(201).json(newIssue);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getIssue = async (req: Request, res: Response) => {};

export { createIssue, getIssue };
