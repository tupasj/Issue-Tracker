import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { User } from '../models/User';
import { db, QueryTypes, Op } from '../config/database';
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
  const { code } = req.params;

  try {
    const retrievedProject = await Project.findOne({ where: { code } });
    res.status(200).json(retrievedProject);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    // const project = await Project.findOne({ where: { code } });
    // await project?.destroy();
    // project_codes: { [Op.contains]: [`${code}`] },
    // const users = await User.findAll({
    //   where: {
    //     project_codes: { [Op.contains]: [`${code}`] },
    //   },
    // });
    // users.forEach((user) => console.log('user: ', user.dataValues));
    // console.log('users.length: ', users.length);
    await Project.destroy({ where: { code } });
    res.status(200).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { createProject, getProject, deleteProject };
