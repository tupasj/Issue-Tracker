import { Request, Response } from 'express';
import { Project } from '../models/Project';
import ShortUniqueId from 'short-unique-id';

const createProject = async (req: Request, res: Response) => {
  const { projectName, email } = req.body;
  const uid = new ShortUniqueId({ length: 8 });
  const shortID = uid();
  console.log('req.body: ', req.body);
  console.log('shortID: ', shortID);

  try {
    const newProject = {
      name: projectName,
      code: shortID,
      user_emails: [email],
    };
    console.log('newProject: ', newProject);
    await Project.create(newProject);
    res.status(201).json(newProject);
  } catch (error: any) {
    console.log('error: ', error.message);
    res.status(400).json({ message: error.message });
  }
};

const getProject = async (req: Request, res: Response) => {};

export { createProject, getProject };
