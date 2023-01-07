import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { db, QueryTypes } from '../config/database';
import ShortUniqueId from 'short-unique-id';

const createProject = async (req: Request, res: Response) => {
  const { projectName, email } = req.body;
  const uid = new ShortUniqueId({ length: 8 });
  const shortID = uid();

  if (projectName == '') {
    return res.status(400).json('Error: Name cannot be empty.');
  }

  try {
    const newProject = {
      name: projectName,
      code: shortID,
      user_emails: [email],
    };

    await Project.create(newProject);
    await db.query(
      `UPDATE users SET project_codes = project_codes || '{${shortID}}' WHERE email='${email}';
    `,
      {
        type: QueryTypes.UPDATE,
      }
    );
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getProject = async (req: Request, res: Response) => {
  const code = req.params.code;

  try {
    const retrievedProject = await Project.findOne({ where: { code } });
    res.status(200).json(retrievedProject);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { createProject, getProject };
