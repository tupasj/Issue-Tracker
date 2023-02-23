import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { User } from '../models/User';
import { Issue } from '../models/Issue';
import { UserDisplayName } from '../models/UserDisplayName';
import ShortUniqueId from 'short-unique-id';

const createProject = async (req: Request, res: Response) => {
  const { projectName, email } = req.body;
  const uid = new ShortUniqueId({ length: 8 });
  const shortID = uid();

  if (projectName == '') {
    return res.status(400).json('Error: Name cannot be empty.');
  }

  try {
    const newProjectData = {
      name: projectName,
      code: shortID,
    };

    const newProject: any = await Project.create(newProjectData);
    const user: any = await User.findOne({ where: { email } });
    await newProject.addUser(user); // Associate this user with the new project (should create a unique record in the junction table)

    const userProjects = await user.getProjects({ joinTableAttributes: [] });
    res.status(201).json(userProjects);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const joinProject = async (req: Request, res: Response) => {
  const { code } = req.params;
  const { email } = req.body;

  try {
    const projectToJoin: any = await Project.findOne({ where: { code } });
    const user: any = await User.findOne({ where: { email } });
    await projectToJoin.addUser(user);

    res.status(200).json(projectToJoin);
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

const getUserProjects = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user: any = await User.findOne({ where: { email } });
    const userProjects = await user.getProjects({ joinTableAttributes: [] });
    res.status(200).json(userProjects);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    await Project.destroy({ where: { code } });
    res.status(200).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const removeUserFromProject = async (req: Request, res: Response) => {
  const { code, email } = req.params;

  try {
    const project = await Project.findOne({ where: { code } });
    const user: any = await User.findOne({ where: { email } });
    await user.removeProject(project); // Remove the user's association with the project (deletes record in junction table, but other tables' records are untouched)

    const userProjects = await user.getProjects({ joinTableAttributes: [] });
    res.status(200).json(userProjects);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateProjectIssue = async (req: Request, res: Response) => {
  const { code, issueNumber } = req.params;
  const { is_open } = req.body;

  try {
    await Issue.update(
      { is_open },
      {
        where: {
          projectCode: code,
          issue_number: issueNumber,
        },
      }
    );
    const updatedIssue: any = await Issue.findOne({
      where: {
        projectCode: code,
        issue_number: issueNumber,
      },
    });
    let issueLabels: any = updatedIssue.getLabels();
    const nullObject = Object.keys(issueLabels).length === 0;
    if (nullObject) {
      issueLabels = [];
    }

    updatedIssue.setDataValue('labels', issueLabels);
    res.status(200).json(updatedIssue);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getProjectUsers = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const project: any = await Project.findOne({
      where: { code },
    });

    const projectUsers = await project.getUsers();
    for (let i = 0; i < projectUsers.length; i++) {
      const userDisplayName: any = await UserDisplayName.findOne({
        where: { userEmail: projectUsers[i].email },
      });
      projectUsers[i].setDataValue(
        'display_name',
        userDisplayName.display_name
      );
    }

    res.status(200).json(projectUsers);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createProject,
  joinProject,
  getProject,
  deleteProject,
  getUserProjects,
  removeUserFromProject,
  updateProjectIssue,
  getProjectUsers,
};
